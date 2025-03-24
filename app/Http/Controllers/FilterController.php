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
			'type' => 'required|in:seleccion_unica,seleccion_multiple,fecha,persona,texto,numero',
			'options' => 'required_if:type,seleccion_unica,seleccion_multiple|array|nullable',
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

		return back();
	}

	public function update(Request $request, Filter $filter)
	{
		$data = $request->validate([
			'name' => 'sometimes|required|string|max:255',
			'options' => 'nullable|array',
		]);

		if (in_array($filter->type, ['seleccion_unica', 'seleccion_multiple'])) {
			if (!$request->filled('options') || !is_array($request->options) || count($request->options) === 0) {
				return back();
			}
		}

		$filter->update($data);

		return back();
	}

	public function destroy(Filter $filter)
	{
		$filter->delete();

		return back();
	}
}
