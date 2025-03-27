<?php

namespace App\Http\Controllers;

use App\Events\SectionUpdated;
use App\Models\Project;
use App\Models\Section;
use Illuminate\Http\RedirectResponse;
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

	public function destroy(Project $project, Section $section)
	{
		// Verifica que la sección pertenece al proyecto
		if ($section->project_id !== $project->id) {
			abort(404, 'La sección no pertenece al proyecto.');
		}

		$section->delete();

		return back()->with('message', 'Sección eliminada correctamente.');
	}
}
