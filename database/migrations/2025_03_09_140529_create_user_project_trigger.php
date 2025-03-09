<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
	/**
	 * Run the migrations.
	 */
	public function up(): void
	{
		DB::unprepared('
            CREATE OR REPLACE FUNCTION create_project_after_user_insert()
            RETURNS TRIGGER AS $$
            BEGIN
                -- Crear un nuevo proyecto con ID autoincremental
                INSERT INTO projects (name, description, created_at)
                VALUES (CONCAT(\'My Tasks \', NEW.name), CONCAT(\'Personal tasks for user \', NEW.name), NOW());
                
                RETURN NEW;
            END;
            $$ LANGUAGE plpgsql;
        ');

		DB::unprepared('
            CREATE TRIGGER create_project_after_user_insert
            AFTER INSERT ON users
            FOR EACH ROW
            EXECUTE FUNCTION create_project_after_user_insert();
        ');
	}


	/**
	 * Reverse the migrations.
	 */
	public function down(): void
	{
		DB::unprepared('DROP TRIGGER IF EXISTS create_project_after_user_insert ON users');
		DB::unprepared('DROP FUNCTION IF EXISTS create_project_after_user_insert');
	}
};
