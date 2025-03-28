<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
	public function search(Request $request, Project $project)
	{
		$request->validate([
			'search' => 'nullable|string|max:255',
		]);

		$search = $request->get('search');

		$users = User::query()
			->when($search, fn($q) => $q
				->where('name', 'like', "%{$search}%")
				->orWhere('email', 'like', "%{$search}%"))
			->limit(10)
			->get(['id', 'name', 'email']);

		return response()->json([
			'users' => $users,
		]);
	}
}
