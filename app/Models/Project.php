<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;

class Project extends Model
{
	use HasFactory;

	protected $fillable = [
		'name',
		'description',
		'user_id',
		'color_icon'
	];




	/* coloaboradores de un proyecto */
	public function users(): BelongsToMany
	{
		return $this->belongsToMany(User::class, 'project_members')
			->withPivot(['id', 'role'])
			->withTimestamps();
	}

	/* las tareas de un proyecto */
	public function tasks(): HasManyThrough
	{
		return $this->hasManyThrough(Task::class, Section::class);
	}

	/* secciones de un proyecto*/
	public function sections(): HasMany
	{
		return $this->hasMany(Section::class);
	}

	/* filtros de un proyecto */
	public function filters(): HasMany
	{
		return $this->hasMany(Filter::class);
	}
}
