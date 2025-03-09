<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Comment extends Model
{
	use HasFactory;

	protected $fillable = [
		'content',
	];


	/* comentarios de una tarea */
	public function tasks(): BelongsToMany
	{
		return $this->belongsToMany(Task::class);
	}

	/* usuario a comentado en una tarea */
	public function users(): BelongsToMany
	{
		return $this->belongsToMany(User::class);
	}
}
