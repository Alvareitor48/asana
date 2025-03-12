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

		DB::unprepared("
			CREATE TRIGGER create_section_after_project_insert
			AFTER INSERT ON projects
			FOR EACH ROW
			BEGIN
				DECLARE new_section_id INT;

				-- Insertar una nueva sección asociada al proyecto recién creado
				INSERT INTO sections (project_id, name, created_at)
				VALUES (NEW.id, 'Sección sin nombre', NOW());

				-- Obtener el ID de la nueva sección insertada
				SET new_section_id = LAST_INSERT_ID();
			END
		");
	}

	/**
	 * Reverse the migrations.
	 */
	public function down(): void
	{
		DB::unprepared("DROP TRIGGER IF EXISTS create_section_after_project_insert;");
	}
};
