<?php

namespace Database\Factories;

use App\Models\Task;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Comment>
 */
class CommentFactory extends Factory
{
	/**
	 * Define the model's default state.
	 *
	 * @return array<string, mixed>
	 */
	public function definition(): array
	{
		return [
			'task_id' => Task::query()->inRandomOrder()->first()?->id,
			'user_id' => User::query()->inRandomOrder()->first()?->id,
			'content' => $this->faker->sentence(),
		];
	}
}
