<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Filter extends Model
{
	use HasFactory;

	protected $fillable = [
		'type',
		'options',
	];
	protected $casts = [
		'options' => 'array',
	];

	/* filtros de un proyecto */
	public function projects(): BelongsTo
	{
		return $this->belongsTo(Project::class);
	}

	/* filtros de una tarea */
	public function tasks(): BelongsToMany
	{
		return $this->belongsToMany(Task::class, 'task_filters')
			->withPivot(['id', 'value']);
	}

	public function taskValues(): HasMany
	{
		return $this->hasMany(TaskFilter::class);
	}
}
