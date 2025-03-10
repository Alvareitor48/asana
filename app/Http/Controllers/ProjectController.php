<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class ProjectController extends Controller
{
	public function index()
	{
		// Listar todos los proyectos
	}

	public function show(Project $project)
	{
		// Mostrar las secciones y tareas de un proyecto especifico
	}

	public function store(Request $request): RedirectResponse
	{
		$request->validate([
			'name' => 'required|string|max:255',
			'description' => 'required|string|max:255',
		]);
		$project = Project::create([
			'name' => $request->name,
			'description' => $request->description,
			'user_id' => auth()->id(),
		]);
		return redirect(route('project.show', $project));
	}
}
