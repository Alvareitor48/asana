<?php

namespace Database\Seeders;

use App\Models\Project;
use App\Models\User;
use Illuminate\Database\Seeder;

class ProjectSeeder extends Seeder
{
	/**
	 * Run the database seeds.
	 */
	public function run(): void
	{
		$user1 = User::where('email', 'alvaro@mail.com')->first();
		$user2 = User::where('email', 'test@example.com')->first();
		$users = User::where('email', '!=', 'test@example.com')->get();


		$project1 = Project::create([
			'name' => 'Me gusta Turso',
			'description' => 'Pignoro to lo que me como',
		]);

		$project2 = Project::create([
			'name' => 'Viru virulento',
			'description' => 'peinar colas de furro',
		]);


		$project1->users()->attach($user1->id, ['role' => 'owner']);
		$project2->users()->attach($user2->id, ['role' => 'owner']);


		$userIds = $users->pluck('id')->toArray();
		$project2->users()->attach($userIds, ['role' => 'member']);
	}
}
