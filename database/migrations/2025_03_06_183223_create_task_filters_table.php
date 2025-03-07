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
		Schema::create('task_filters', function (Blueprint $table) {
			$table->id();
			$table->foreignId('task_id')->references('id')->on('tasks')->onDelete('cascade');
			$table->foreignId('filter_id')->references('id')->on('filters')->onDelete('cascade');
			$table->text('value');
			$table->primary(['task_id', 'filter_id']);
			$table->timestamps();
		});
	}

	/**
	 * Reverse the migrations.
	 */
	public function down(): void
	{
		Schema::dropIfExists('task_filters');
	}
};
