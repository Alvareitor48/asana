<?php

namespace App\Events;

use App\Models\Section;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
use Illuminate\Queue\SerializesModels;

class SectionUpdated implements ShouldBroadcastNow
{
	use InteractsWithSockets, SerializesModels;

	public $section;

	public function __construct(Section $section)
	{
		$this->section = $section;
	}

	public function broadcastOn()
	{
		return new Channel('sections');
	}

	public function broadcastAs()
	{
		return 'section.updated';
	}
}