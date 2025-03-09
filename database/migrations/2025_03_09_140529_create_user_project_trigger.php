<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

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
            DECLARE
                new_project_id INT; -- Usar INT para el ID del proyecto
            BEGIN
                -- Crear un nuevo proyecto y obtener su ID
                INSERT INTO projects (name, description, created_at)
                VALUES (
                    CONCAT(\'My Tasks \', NEW.name),
                    CONCAT(\'Personal tasks for user \', NEW.name),
                    NOW()
                )
                RETURNING id INTO new_project_id; -- Capturar el ID generado

                -- Insertar al usuario en project_members con el rol de "owner"
                INSERT INTO project_members (project_id, user_id, role)
                VALUES (new_project_id, NEW.id, \'owner\');

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
