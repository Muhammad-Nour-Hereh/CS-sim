<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\SnippetController;
use App\Http\Controllers\SnippetRunnerController;
use Illuminate\Support\Facades\Route;

Route::group(["prefix" => "v1"], function () {

    Route::prefix('auth')->group(function () {
        Route::post('/login', [AuthController::class, 'login']);
        Route::post('/register', [AuthController::class, 'register']);

        // Protected routes (require JWT token)
        Route::middleware('jwt')->group(function () {
            Route::get('/me', [AuthController::class, 'me']);
            Route::post('/logout', [AuthController::class, 'logout']);
        });
    });

    
    Route::middleware('jwt')->group(function () {

        Route::prefix('snippets')->group(function () {
            Route::get('/', [SnippetController::class, 'index']);
            Route::post('/', [SnippetController::class, 'store']);
            Route::get('/{id}', [SnippetController::class, 'show']);
            Route::put('/{id}', [SnippetController::class, 'update']);
            Route::delete('/{id}', [SnippetController::class, 'destroy']);

            Route::post('/run/{id}', [SnippetRunnerController::class, 'run']);
        });
    });
});
