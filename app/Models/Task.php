<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Task extends Model
{
	use HasFactory;

	protected $fillable = [
		'title',
		'description',
		'status',
		'due_date',
		'attachment',
	];


	protected function casts(): array
	{
		return [
			'due_date' => 'datetime',
		];
	}

	/* tareas para una seccion del proyecto */
	public function section(): BelongsTo
	{
		return $this->belongsTo(Section::class);
	}


	/* collaboradores de la tarea */
	public function users(): BelongsToMany
	{
		return $this->belongsToMany(User::class, 'task_collaborators')
			->withPivot(['id', 'role']);
	}

	/*  una tarea la realiza un usuario */
	public function assignedTo(): BelongsTo
	{
		return $this->belongsTo(User::class);
	}

	/*  una tarea tiene comentarios */
	public function comments(): HasMany
	{
		return $this->hasMany(Comment::class);
	}

	/* filtros de una tarea */
	public function filters(): BelongsToMany
	{
		return $this->belongsToMany(Filter::class, 'task_filters')
			->withPivot(['id', 'value']);
	}
}
