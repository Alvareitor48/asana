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
		Schema::create('filters', function (Blueprint $table) {
			$table->id();
			$table->string('name');
			$table->foreignId('project_id')->references('id')->on('projects')->onDelete('cascade');
			$table->string('type');
			$table->json('options')->nullable();
			$table->timestamps();
		});
	}

	/**
	 * Reverse the migrations.
	 */
	public function down(): void
	{
		Schema::dropIfExists('filters');
	}
};
