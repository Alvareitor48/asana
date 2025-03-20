<?php

namespace App\Http\Controllers;

use App\Events\SectionUpdated;
use App\Models\Project;
use App\Models\Section;
use Illuminate\Http\Request;

class SectionController extends Controller
{
	public function store(Request $request, Project $project)
	{
		$validated = $request->validate([
			'name' => 'required|string|max:255',
		]);
		$section = Section::create([
			'name' => $validated['name'],
			'project_id' => $project->id,
		]);
		broadcast(new SectionUpdated($section));
		return redirect(route('project.show', $project));
	}

	public function update(Request $request, Project $project, Section $section)
	{
		// Actualizar una sección
	}
}
