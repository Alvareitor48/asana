<?php

namespace App\Providers;

use Illuminate\Support\Facades\Broadcast;
use Illuminate\Support\ServiceProvider;

class BroadcastServiceProvider extends ServiceProvider
{
	public function boot(): void
	{
		// Canal privado para proyectos
		Broadcast::channel('projects.{userId}', function ($user, $userId) {
			return (int) $user->id === (int) $userId;
		});

		// Aquí puedes registrar otros canales como:
		// Broadcast::channel('tasks.{projectId}', fn ($user, $projectId) => ...);
	}
}
