<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TaskResource extends JsonResource
{
	/**
	 * Transform the resource into an array.
	 *
	 * @return array<string, mixed>
	 */
	public function toArray(Request $request): array
	{
		return [
			'id' => $this->id,
			'title' => $this->title,
			'assigned_to' => $this->assignedTo ? $this->assignedTo->id : null,
			'due_date' => optional($this->due_date)->format('Y-m-d'),
			'project' => new IndexProjectsResource(
				$this->section->project
			),
			'description' => $this->description,
			'comments' => $this->comments ? CommentResource::collection($this->comments)->toArray($request) : null,
			'section_id' => $this->section->id,
		];
	}
}
