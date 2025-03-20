<?php

return [

	/*
    |--------------------------------------------------------------------------
    | Default Broadcaster
    |--------------------------------------------------------------------------
    |
    | Esta opción controla el "broadcaster" predeterminado que será utilizado
    | por Laravel cuando se emitan eventos. Se puede cambiar en `.env`.
    |
    */

	'default' => env('BROADCAST_DRIVER', 'pusher'),

	/*
    |--------------------------------------------------------------------------
    | Broadcasters Disponibles
    |--------------------------------------------------------------------------
    |
    | Laravel soporta Pusher, Redis, Log y Null.
    |
    */

	'connections' => [

		'pusher' => [
			'driver' => 'pusher',
			'key' => env('PUSHER_APP_KEY'),
			'secret' => env('PUSHER_APP_SECRET'),
			'app_id' => env('PUSHER_APP_ID'),
			'options' => [
				'cluster' => env('PUSHER_APP_CLUSTER'),
				'useTLS' => true, // Habilita SSL
				'encrypted' => true, // Encriptación de datos
			],
		],

		'redis' => [
			'driver' => 'redis',
			'connection' => 'default',
		],

		'log' => [
			'driver' => 'log',
		],

		'null' => [
			'driver' => 'null',
		],
	],

];
