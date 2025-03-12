<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
	public function up(): void
	{
		DB::unprepared("
            CREATE TRIGGER create_project_after_user_insert
            AFTER INSERT ON users
            FOR EACH ROW
            BEGIN
                DECLARE new_project_id INT;

                INSERT INTO projects (name, description, created_at)
                VALUES (
                    CONCAT('My Tasks ', NEW.name),
                    CONCAT('Personal tasks for user ', NEW.name),
                    NOW()
                );

                SET new_project_id = LAST_INSERT_ID();

                INSERT INTO project_members (project_id, user_id, role, created_at)
                VALUES (new_project_id, NEW.id, 'owner', NOW());
            END
        ");
	}

	public function down(): void
	{
		DB::unprepared("DROP TRIGGER IF EXISTS create_project_after_user_insert");
	}
};
