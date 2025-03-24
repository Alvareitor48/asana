<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class EmailVerificationPromptController extends Controller
{
	/**
	 * Display the email verification prompt.
	 */
	public function __invoke(Request $request)
	{
		return $request->user()->hasVerifiedEmail()
			? Inertia::location(route('home'))
			: Inertia::render('auth/pages/VerifyEmail', ['status' => session('status')]);
	}
}
