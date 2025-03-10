<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Section extends Model
{
	use HasFactory;

	protected $fillable = [
		'name',
		'project_id'
	];


	/* sections de un proyecto*/
	public function project(): BelongsTo
	{
		return $this->belongsTo(Project::class);
	}

	public function tasks(): HasMany
	{
		return $this->hasMany(Task::class);
	}
}
