<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\User;
use Illuminate\Http\Request;

class CollaboratorController extends Controller
{
	public function store(Request $request, Project $project)
	{
		$validated = $request->validate([
			'user_id' => 'required|exists:users,id',
		]);

		$project->users()->syncWithoutDetaching([
			$validated['user_id'] => ['role' => 'member'],
		]);

		return redirect()->route('project.show', $project);
	}

	public function destroy(Project $project, User $user)
	{
		$project->users()->detach($user->id);

		return redirect()->route('project.show', $project);
	}
}
