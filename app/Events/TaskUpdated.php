<?php

namespace App\Events;

use App\Http\Resources\TaskResource;
use App\Models\Task;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
use Illuminate\Queue\SerializesModels;

class TaskUpdated implements ShouldBroadcastNow
{
	use InteractsWithSockets, SerializesModels;

	public $task;

	public function __construct(Task $task)
	{
		$this->task = new TaskResource($task);
	}

	public function broadcastOn()
	{
		return new Channel('tasks');
	}

	public function broadcastAs()
	{
		return 'task.updated';
	}
}
