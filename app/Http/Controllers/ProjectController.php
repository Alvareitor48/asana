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
		return Inertia::render('projects_and_tasks/pages/Project', [
			'sections' => ProjectShowResource::collection($project->sections()->with('tasks')->get())->toArray(request()),
			'project' => (new IndexProjectsResource($project))->toArray(request()),
		]);
	}

	public function store(Request $request): RedirectResponse
	{
		$request->validate([
			'name' => 'required|string|max:255',
			'description' => 'string|max:255|nullable',
		], [
			'name.required' => 'El nombre es obligatorio.',
			'name.string' => 'El nombre debe ser una cadena de texto.',
			'name.max' => 'El nombre no puede superar los 255 caracteres.',
			'description.string' => 'La descripción debe ser una cadena de texto.',
			'description.max' => 'La descripción no puede superar los 255 caracteres.',
		]);
		$project = Project::create([
			'name' => $request->name,
			'description' => $request->description,
		]);
		$project->users()->attach(auth()->id(), ['role' => 'owner']);
		broadcast(new ProjectCreated($project))->toOthers();
		return redirect(route('project.show', $project));
	}
}
