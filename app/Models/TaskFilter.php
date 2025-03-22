<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class TaskFilter extends Model
{
	protected $table = 'task_filters';

	protected $fillable = [
		'task_id',
		'filter_id',
		'value',
	];

	public $incrementing = false; // Porque la clave primaria es compuesta (task_id + filter_id)

	protected $casts = [
		'value' => 'array', // Para que Laravel convierta automáticamente JSON a array
	];

	/* Filtro al que pertenece este valor */
	public function filter(): BelongsTo
	{
		return $this->belongsTo(Filter::class);
	}

	/* Tarea a la que pertenece este valor */
	public function task(): BelongsTo
	{
		return $this->belongsTo(Task::class);
	}
}
