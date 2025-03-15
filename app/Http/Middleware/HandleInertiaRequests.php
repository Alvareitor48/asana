<?php

namespace App\Http\Middleware;

use App\Http\Resources\IndexProjectsResource;
use App\Http\Resources\UserResource;
use App\Models\Project;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
	/**
	 * The root template that is loaded on the first page visit.
	 *
	 * @var string
	 */
	protected $rootView = 'app';

	/**
	 * Determine the current asset version.
	 */
	public function version(Request $request): ?string
	{
		return parent::version($request);
	}

	/**
	 * Define the props that are shared by default.
	 *
	 * @return array<string, mixed>
	 */
	public function share(Request $request): array
	{
		return [
			...parent::share($request),
			'auth' => [
				'user' => $request->user(),
			],
			'projects' => auth()->check()
				? IndexProjectsResource::collection(
					Project::whereHas('users', fn($query) => $query->where('user_id', auth()->id()))
						->where('is_my_tasks', false)
						->get()
				)->toArray($request)
				: [],
			'my_tasks' => auth()->check()
				? (new IndexProjectsResource(
					Project::whereHas('users', fn($query) => $query->where('user_id', auth()->id()))
						->where('is_my_tasks', true)
						->first()
				))->toArray($request)
				: [],
			'collaborators' => auth()->check() && request()->route('project')
				? UserResource::collection(
					User::whereHas(
						'projects',
						fn($query) =>
						$query->where('projects.id', request()->route('project')->id)
					)->get()
				)->toArray($request)
				: [],
		];
	}
}
