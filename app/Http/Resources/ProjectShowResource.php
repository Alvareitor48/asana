<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProjectShowResource extends JsonResource
{
	/**
	 * Transform the resource into an array.
	 *
	 * @return array<string, mixed>
	 */
	public function toArray(Request $request): array
	{
		return [
			'section' => [
				'id' => $this->id,
				'name' => $this->name
			],
			'tasks' => $this->tasks->map(fn($task) => [
				'id' => $task->id,
				'title' => $task->title,
				'description' => $task->description,
				'status' => $task->status,
				'due_date' => optional($task->due_date)->format('Y-m-d'),
				'assigned_to' => $task->assignedTo ? $task->assignedTo->id : null,
				'section_id' => $task->section->id,
				'filters' => $task->filters->map(fn($filter) => [
					'filter_id' => $filter->id,
					'value' => json_decode($filter->pivot->value, true),
				]),
			])->toArray(),
		];
	}
}
