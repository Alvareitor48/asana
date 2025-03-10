<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\Section;
use Illuminate\Http\Request;

class SectionController extends Controller
{
	public function store(Request $request, Project $project)
	{
		$validated = $request->validate([
			'title' => 'required|string|max:255',
		]);
		Section::create([
			'name' => $validated['title'],
			'project_id' => $project->id,
		]);
		return redirect(route('project.show', $project));
	}

	public function update(Request $request, Project $project, Section $section)
	{
		// Actualizar una sección
	}
}
