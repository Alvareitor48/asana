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

		$tasks = Task::factory()->createMany([
			[
				'title' => 'Tarea de prueba',
				'assigned_to' => $user1->id,
				'section_id' => $section->id,
				'status' => false,
				'due_date' => null
			],
		]);

		// Asignar filtros a cada tarea creada
		foreach ($tasks as $task) {
			$project = $task->section->project; // Obtener el proyecto
			$projectFilters = $project->filters; // Obtener filtros del proyecto

			foreach ($projectFilters as $filter) {
				// Asegurarse de que no existe ya (por si vuelves a ejecutar el seeder)
				if (!$task->filters()->where('filter_id', $filter->id)->exists()) {
					$task->filters()->attach($filter->id, ['value' => null]);
				}
			}
		}
	}
}
