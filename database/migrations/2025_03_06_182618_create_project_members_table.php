<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
	/**
	 * Run the migrations.
	 */
	public function up(): void
	{
		Schema::create('project_members', function (Blueprint $table) {
			$table->foreignId('project_id')->references('id')->on('projects')->onDelete('cascade');
			$table->foreignId('user_id')->references('id')->on('users')->onDelete('cascade');
			$table->string('role')->default('member');
			$table->primary(['project_id', 'user_id']);
			$table->timestamps();
		});
	}

	/**
	 * Reverse the migrations.
	 */
	public function down(): void
	{
		Schema::dropIfExists('project_members');
	}
};
