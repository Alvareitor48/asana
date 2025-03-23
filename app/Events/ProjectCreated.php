<?php

namespace App\Events;

use App\Models\Project;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
use Illuminate\Queue\SerializesModels;

class ProjectCreated implements ShouldBroadcastNow
{
	use InteractsWithSockets, SerializesModels;

	public $project;

	public function __construct(Project $project)
	{
		$this->project = $project;
	}

	public function broadcastOn(): array
	{
		return $this->project
			->users // Asegúrate de que esté cargado o usa $this->project->loadMissing('users')
			->map(fn($user) => new PrivateChannel('projects.' . $user->id))
			->toArray();
	}

	public function broadcastAs()
	{
		return 'project.created'; // Nombre del evento en el frontend
	}
}
