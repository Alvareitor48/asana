<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
use Illuminate\Queue\SerializesModels;

class TaskDeleted implements ShouldBroadcastNow
{
	use InteractsWithSockets, SerializesModels;

	public $taskId;
	public $sectionId;

	public function __construct($taskId, $sectionId)
	{
		$this->taskId = $taskId;
		$this->sectionId = $sectionId;
	}

	public function broadcastOn()
	{
		return new Channel('tasks');
	}

	public function broadcastAs()
	{
		return 'task.deleted';
	}
}
