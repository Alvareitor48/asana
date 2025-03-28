<?php

namespace App\Http\Controllers;

use App\Events\ProjectCreated;
use App\Http\Resources\IndexProjectsResource;
use App\Http\Resources\ProjectShowResource;
use App\Http\Resources\ShowProjectResource;
use App\Models\Project;
use App\Models\Task;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProjectController extends Controller
{
	public function index()
	{
		return Inertia::render('projects_and_tasks/pages/ProjectsIndex', IndexProjectsResource::collection(
			Project::whereHas('users', function ($query) {
				$query->where('user_id', auth()->id());
			})->get()
		)->toArray(request()));
	}

	public function show(Project $project)
	{
		$usersFromSearch = session('collaborator_search_results');
		return Inertia::render('projects_and_tasks/pages/Project', [
			'sections' => ProjectShowResource::collection($project->sections()->with('tasks.filters')->get())->toArray(request()),
			'project' => (new IndexProjectsResource($project))->toArray(request()),
			'searchResults' => $usersFromSearch,
		]);
	}

	public function store(Request $request): RedirectResponse
	{
		$request->validate([
			'name' => 'required|string|max:255',
			'description' => 'string|max:255|nullable',
			'color_icon' => [
				'required',
				'regex:/^#([A-Fa-f0-9]{3}){1,2}$/',
			]
		], [
			'name.required' => 'El nombre es obligatorio.',
			'name.string' => 'El nombre debe ser una cadena de texto.',
			'name.max' => 'El nombre no puede superar los 255 caracteres.',
			'description.string' => 'La descripción debe ser una cadena de texto.',
			'description.max' => 'La descripción no puede superar los 255 caracteres.',
			'color_icon.required' => 'El campo de color del ícono es obligatorio.',
			'color_icon.regex' => 'El código de color del ícono debe ser un valor hexadecimal válido, por ejemplo: #3B83BD.',
		]);
		$project = Project::create([
			'name' => $request->name,
			'description' => $request->description,
			'color_icon' => $request->color_icon
		]);
		$project->users()->attach(auth()->id(), ['role' => 'owner']);
		$project->load('users');
		broadcast(new ProjectCreated($project));
		return redirect(route('project.show', $project));
	}

	public function update(Request $request, Project $project): RedirectResponse
	{
		$data = $request->validate([
			'name' => 'required|string|max:255',
			'description' => 'nullable|string|max:255',
			'color_icon' => [
				'required',
				'regex:/^#([A-Fa-f0-9]{3}){1,2}$/',
			],
		]);

		$project->update($data);

		return redirect()->route('project.show', $project);
	}

	public function destroy(Project $project): RedirectResponse
	{
		// Verificar si el usuario autenticado es el propietario del proyecto
		$userId = auth()->id();
		$isOwner = $project->users()->where('user_id', $userId)->where('role', 'owner')->exists();

		if (!$isOwner) {
			// Si el usuario no es el propietario, redirigir con un mensaje de error
			return redirect()->route('project.show', ['project' => $project])->withErrors('No tienes permiso para eliminar este proyecto.');
		}

		// Eliminar el proyecto
		$project->delete();
		// Redirigir a la lista de proyectos con un mensaje de éxito
		return redirect()->route('home')->with('success', 'Proyecto eliminado correctamente.');
	}
}
