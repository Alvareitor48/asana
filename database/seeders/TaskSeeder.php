<?php

namespace Database\Seeders;

use App\Models\Section;
use App\Models\Task;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TaskSeeder extends Seeder
{
	/**
	 * Run the database seeds.
	 */
	public function run(): void
	{

		$user1 = User::where('email', 'alvaro@mail.com')->first();
		$section = Section::where('project_id', 2)->first();

		Task::factory()->createMany([
			[
				'assigned_to' => $user1->id,
				'section_id' => $section->id,
				'status' => 'pending',
				'attachment' => null,
				'due_date' => null
			],

		]);
	}
}
