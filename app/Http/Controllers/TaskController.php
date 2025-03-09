<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{
	public function show(Project $project, Task $task)
	{
		// Mostrar detalles de una tarea
	}

	public function store(Request $request, Project $project)
	{
		// Crear una nueva tarea en un proyecto
	}

	public function edit(Project $project, Task $task)
	{
		// Mostrar formulario de edición de una tarea
	}

	public function update(Request $request, Project $project, Task $task)
	{
		// Actualizar una tarea
	}

	public function responsibles(Project $project, Task $task)
	{
		// Mostrar responsables disponibles para asignar a la tarea
	}

	public function projects(Project $project, Task $task)
	{
		// Mostrar proyectos disponibles para mover la tarea
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
