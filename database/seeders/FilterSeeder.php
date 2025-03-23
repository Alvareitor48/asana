<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Models\Project;
use App\Models\Task;
use App\Models\Filter;
use App\Models\TaskFilter;
use App\Models\Section;
use App\Models\User;

class FilterSeeder extends Seeder
{
	public function run(): void
	{
		// Obtener usuario y proyecto ya existentes
		$user = User::query()->where('name', 'Alvaro')->firstOrFail();
		$project = Project::query()->where('name', 'Me gusta turso')->firstOrFail();

		// Crear sección para el proyecto
		$section = Section::create([
			'project_id' => $project->id,
			'name' => 'Sección para seeder',
		]);

		// Crear tarea en esa sección
		$task = Task::create([
			'title' => 'Tarea con filtros',
			'description' => 'Esta tarea tiene filtros de prueba',
			'assigned_to' => $user->id,
			'section_id' => $section->id,
			'due_date' => now()->addDays(3),
		]);

		// Crear filtros y asociar valores
		$filterData = [
			[
				'type' => 'seleccion_unica',
				'value' => 'En progreso',
				'options' => ['Por hacer', 'En progreso', 'Hecho'],
			],
			[
				'type' => 'seleccion_multiple',
				'value' => ['Urgente', 'Importante'],
				'options' => ['Urgente', 'Importante', 'Backend', 'Frontend'],
			],
			[
				'type' => 'fecha',
				'value' => now()->addWeek()->toDateString(),
				'options' => null,
			],
			[
				'type' => 'persona',
				'value' => (string) $user->id,
				'options' => null,
			],
			[
				'type' => 'texto',
				'value' => 'Texto de prueba del filtro',
				'options' => null,
			],
			[
				'type' => 'numero',
				'value' => 42,
				'options' => null,
			],
		];

		foreach ($filterData as $data) {
			$filter = Filter::create([
				'name' => ucfirst($data['type']) . ' para ' . $task->title,
				'project_id' => $project->id,
				'type' => $data['type'],
				'options' => $data['options'], // Laravel convierte array a JSON
			]);

			TaskFilter::create([
				'task_id' => $task->id,
				'filter_id' => $filter->id,
				'value' => $data['value'],
			]);
		}

		$projectFilters = $project->filters;

		$project->tasks()->each(function ($task) use ($projectFilters) {
			foreach ($projectFilters as $filter) {
				if (!$task->filters()->where('filter_id', $filter->id)->exists()) {
					$task->filters()->attach($filter->id, ['value' => null]);
				}
			}
		});
	}
}
