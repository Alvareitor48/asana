<?php

namespace App\Http\Controllers;

use App\Http\Resources\IndexProjectsResource;
use App\Http\Resources\ResponsibleResource;
use App\Models\Project;
use App\Models\Section;
use App\Models\Task;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class TaskController extends Controller
{
	public function show(Project $project, Task $task)
	{
		// Mostrar detalles de una tarea
	}

	public function store(Request $request, Project $project, Section $section): RedirectResponse
	{
		$validated = $request->validate([
			'title' => 'required|string|max:255',
		]);
		Task::create([
			'title' => $request->title,
			'section_id' => $section->id,
		]);
		return redirect(route('project.show', $project));
	}

	public function edit(Project $project, Task $task)
	{
		// Mostrar formulario de edición de una tarea
	}

	public function update(Request $request, Project $project, Task $task)
	{
		// Actualizar una tarea
	}

	public function responsibles(Project $project, Task $task): RedirectResponse
	{
		return redirect()->route('tasks.show', ['project' => $project, 'task' => $task])->with('responsibles', ResponsibleResource::collection(
			ResponsibleResource::collection($project->users)->toArray(request())
		));
	}

	public function projects(Project $project, Task $task): RedirectResponse
	{
		$projects = IndexProjectsResource::collection(
			Project::whereHas('users', function ($query) {
				$query->where('user_id', auth()->id());
			})->get()
		)->toArray(request());
		return redirect()->route('tasks.show', ['project' => $project, 'task' => $task])->with('projects', $projects);
	}

	public function destroy(Project $project, Task $task)
	{
		// Soft delete de una tarea
	}

	public function restore(Project $project, Task $task)
	{
		// Restaurar una tarea eliminada
	}

	public function forceDelete(Project $project, Task $task)
	{
		// Eliminar una tarea de forma permanente
	}

	public function comment(Request $request, Project $project, Task $task)
	{
		// Agregar un comentario a una tarea
	}
}
