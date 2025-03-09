<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Project extends Model
{
	use HasFactory;

	protected $fillable = [
		'name',
		'description',
		'created_at'
	];

	/* coloaboradores de un proyecto */
	public function users(): BelongsToMany
	{
		return $this->belongsToMany(User::class, 'project_members')
			->withPivot(['id', 'role']);
	}

	/* las tareas de un proyecto */
	public function tasks(): HasMany
	{
		return $this->hasMany(Task::class);
	}

	/* tareas para una seccion del proyecto */
	public function sections(): BelongsToMany
	{
		return $this->belongsToMany(Task::class, 'sections')
			->withPivot(['id', 'name']);
	}

	/* filtros de un proyecto */
	public function filters(): HasMany
	{
		return $this->hasMany(Filter::class);
	}
}
