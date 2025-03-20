<?php

namespace App\Events;

use App\Models\Project;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
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

	public function broadcastOn()
	{
		return new Channel('projects'); // Canal donde se enviará el evento
	}

	public function broadcastAs()
	{
		return 'project.created'; // Nombre del evento en el frontend
	}
}
