<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\Filter;
use Illuminate\Http\Request;

class FilterController extends Controller
{
	public function store(Request $request, Project $project)
	{
		$data = $request->validate([
			'name' => 'required|string|max:255',
			'type' => 'required|in:unica,multiple,fecha,persona,texto,numero',
			'options' => 'required_if:type,unica,multiple|array|nullable',
		]);

		$filter = Filter::create([
			'name' => $data['name'],
			'type' => $data['type'],
			'options' => $data['options'] ?? null,
			'project_id' => $project->id,
		]);

		$project->tasks()->each(function ($task) use ($filter) {
			$task->filters()->attach($filter->id, ['value' => null]);
		});

		return redirect()->route('project.show', $project);
	}

	public function update(Request $request, Filter $filter)
	{
		$data = $request->validate([
			'name' => 'sometimes|required|string|max:255',
			'options' => 'nullable|array',
		]);

		if (in_array($filter->type, ['unica', 'multiple'])) {
			if (!$request->filled('options') || !is_array($request->options) || count($request->options) === 0) {
				return back();
			}
		}

		$filter->update($data);

		return back();
	}

	public function destroy(Project $project, $filter)
	{
		$filter = Filter::findOrFail($filter);

		$filter->delete();

		return back();
	}
}
