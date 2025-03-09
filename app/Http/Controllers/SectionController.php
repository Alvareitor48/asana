<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\Section;
use Illuminate\Http\Request;

class SectionController extends Controller
{
	public function store(Request $request, Project $project)
	{
		// Crear una nueva sección en un proyecto
	}

	public function update(Request $request, Project $project, Section $section)
	{
		// Actualizar una sección
	}
}
