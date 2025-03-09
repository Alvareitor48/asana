<?php

namespace App\Http\Controllers;

use App\Models\Project;
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

	public function store(Request $request)
	{
		// Crear un nuevo proyecto
	}
}
