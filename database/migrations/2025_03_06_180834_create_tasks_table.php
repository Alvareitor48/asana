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
		Schema::create('tasks', function (Blueprint $table) {
			$table->id();
			$table->string('title');
			$table->text('description')->nullable();
			$table->foreignId('assigned_to')->references('id')->on('users')->onDelete('cascade');
			$table->foreignId('assigned_to')->references('id')->on('users')->onDelete('cascade')->nullable();
			$table->foreignId('section_id')->references('id')->on('sections')->onDelete('cascade');
			$table->jsonb('attachment')->nullable();
			$table->string('status')->default('pending');
			$table->timestamp('due_date')->nullable();
			$table->timestamps();
		});
	}

	/**
	 * Reverse the migrations.
	 */
	public function down(): void
	{
		Schema::dropIfExists('tasks');
	}
};
