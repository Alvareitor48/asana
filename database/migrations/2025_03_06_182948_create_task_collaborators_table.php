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
        Schema::create('task_collaborators', function (Blueprint $table) {
            $table->id();
			$table->foreignId('task_id')->references('id')->on('tasks')->onDelete('cascade');
			$table->foreignId('user_id')->references('id')->on('users')->onDelete('cascade');
			$table->string('role')->default('collaborator');
			$table->primary(['task_id', 'user_id']);
			$table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('task_collaborators');
    }
};
