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
			'section' => $this->name,
			'tasks' => $this->tasks->map(fn($task) => [
				'id' => $task->id,
				'title' => $task->title,
				'description' => $task->description,
				'status' => $task->status,
				'due_date' => $task->due_date,
			])->toArray(),
		];
	}
}
