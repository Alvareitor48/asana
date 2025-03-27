<?php

use App\Http\Controllers\FilterController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\SectionController;
use App\Http\Controllers\TaskController;
use Illuminate\Support\Facades\Broadcast;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware('auth')->group(function () {
	Route::get('/', function () {
		return Inertia::render('home/pages/Home', [
			'canLogin' => Route::has('login'),
			'canRegister' => Route::has('register'),
		]);
	})->name('home');
	Route::get('/projects', [ProjectController::class, 'index'])
		->name('tasks.index');
	Route::get('/projects/{project}', [ProjectController::class, 'show'])
		->name('project.show');
	Route::post('/projects', [ProjectController::class, 'store'])
		->name('project.store');
	Route::patch('/projects/{project}', [ProjectController::class, 'update'])
		->name('project.update');
	Route::delete('/projects/{project}', [ProjectController::class, 'destroy'])
		->name('project.destroy');
	Route::get('/projects/{project}/tasks/{task}', [TaskController::class, 'show'])
		->name('tasks.show');
	Route::post('/projects/{project}/{section}/tasks', [TaskController::class, 'store'])
		->name('tasks.store');
	Route::get('/projects/{project}/tasks/{task}/edit', [TaskController::class, 'edit'])
		->name('tasks.edit');
	Route::patch('/projects/{project}/tasks/{task}', [TaskController::class, 'update'])
		->name('tasks.update');
	Route::get('/projects/{project}/tasks/{task}/responsibles', [TaskController::class, 'responsibles'])
		->name('tasks.responsibles');
	Route::get('/projects/{project}/tasks/{task}/projects', [TaskController::class, 'projects'])
		->name('tasks.projects');
	Route::delete('/projects/{project}/tasks/{task}', [TaskController::class, 'destroy'])
		->name('tasks.destroy');
	Route::delete('/projects/{project}/filters/{filter}', [FilterController::class, 'destroy'])
		->name('filter.destroy');
	Route::post('/projects/{project}/filters', [FilterController::class, 'store'])
		->name('filter.store');
	Route::get('/projects/{project}/tasks/{task}/restore', [TaskController::class, 'restore'])
		->name('tasks.restore');
	Route::delete('/projects/{project}/tasks/{task}/force', [TaskController::class, 'forceDelete'])
		->name('tasks.forceDelete');
	Route::post('/projects/{project}/tasks/{task}/comments', [TaskController::class, 'comment'])
		->name('tasks.comments.store');
	Route::post('/projects/{project}/sections', [SectionController::class, 'store'])
		->name('section.store');
	Route::patch('/projects/{project}/sections/{section}', [SectionController::class, 'update'])
		->name('section.update');
	Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
	Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
	Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
	Broadcast::routes();
});

require __DIR__ . '/auth.php';
