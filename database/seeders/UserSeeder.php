<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
	/**
	 * Run the database seeds.
	 */
	public function run(): void
	{
		User::factory()->createMany([
			[
				'name' => 'Test User',
				'email' => 'test@example.com',
			],
			[
				'name' => 'Alvaro',
				'email' => 'alvaro@mail.com',
				'password' => bcrypt('12345678')
			]
		]);
	}
}
