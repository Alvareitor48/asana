<?php

namespace App\Http\Controllers;

use App\Events\TaskUpdated;
use App\Http\Resources\IndexProjectsResource;
use App\Http\Resources\ResponsibleResource;
use App\Http\Resources\TaskResource;
use App\Models\Project;
use App\Models\Section;
use App\Models\Task;
use App\Models\TaskFilter;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TaskController extends Controller
{
	public function show(Project $project, Task $task)
	{
		// Mostrar detalles de una tarea
	}

	public function store(Project $project, Section $section): RedirectResponse
	{
		$task = Task::create([
			'title' => "Nueva tarea",
			'section_id' => $section->id,
		]);
		$filters = $project->filters;

		foreach ($filters as $filter) {
			$task->filters()->attach($filter->id, ['value' => null]);
		}
		broadcast(new TaskUpdated($task));
		return redirect(route('project.show', $project));
	}

	public function edit(Project $project, Task $task)
	{
		return Inertia::render(
			'projects_and_tasks/pages/EditTask',
			['task' => new TaskResource($task)],
		);
	}

	public function update(Request $request, Project $project, Task $task)
	{
		$data = $request->validate([
			'title' => 'sometimes|required|string|max:255',
			'assigned_to' => 'sometimes|nullable|exists:users,id',
			'due_date' => 'sometimes|nullable|date',
			'section_id' => 'sometimes|required|exists:sections,id',
			'description' =>  'sometimes|nullable|string|max:500',
		]);
		$task->update([
			'title' => $data['title'],
			'due_date' => $data['due_date'],
			'section_id' => $data['section_id'],
			'description' => $data['description'],
		]);
		if ($data['assigned_to']) {
			$task->assignedTo()->associate($data['assigned_to']);
		} else {
			$task->assignedTo()->dissociate();
		}
		$task->save();
		if ($request->has('filters')) {
			foreach ($request->filters as $filterData) {
				TaskFilter::query()
					->where('task_id', $task->id)
					->where('filter_id', $filterData['filter_id'])
					->update([
						'value' => json_encode($filterData['value']),
					]);
			}
		}

		$task->refresh()->load('assignedTo');
		broadcast(new TaskUpdated($task));

		return back();
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
