<?php

namespace App\Http\Controllers;

use App\Http\Resources\IndexProjectsResource;
use App\Http\Resources\ProjectShowResource;
use App\Http\Resources\ShowProjectResource;
use App\Models\Project;
use App\Models\Task;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProjectController extends Controller
{
	public function index()
	{
		return Inertia::render('projects/pages/ProjectsIndex', IndexProjectsResource::collection(
			Project::whereHas('users', function ($query) {
				$query->where('user_id', auth()->id());
			})->get()
		)->toArray(request()));
	}

	public function show(Project $project)
	{
		return Inertia::render('projects/pages/Project', [
			'project' => ProjectShowResource::collection($project->sections()->with('tasks')->get())->toArray(request())
		]);
	}

	public function store(Request $request): RedirectResponse
	{
		$request->validate([
			'name' => 'required|string|max:255',
			'description' => 'required|string|max:255',
		]);
		$project = Project::create([
			'name' => $request->name,
			'description' => $request->description,
			'user_id' => auth()->id(),
		]);
		return redirect(route('project.show', $project));
	}
}
