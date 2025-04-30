<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CheatController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\GuildbookController;
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

        Route::prefix('courses')->group(function () {
            Route::get('/{id}', [CourseController::class, 'show']);
        });

        Route::prefix('guildbooks')->group(function () {
            Route::get('/{id}', [GuildbookController::class, 'show']);
        });

        Route::prefix('cheats')->group(function () {
            Route::get('/{id}', [CheatController::class, 'show']);
        });
    });

    Route::middleware('admin')->group(function () {
        Route::prefix('courses')->group(function () {
            Route::get('/', [CourseController::class, 'index']);
            Route::post('/', [CourseController::class, 'store']);
            Route::put('/{id}', [CourseController::class, 'update']);
            Route::delete('/{id}', [CourseController::class, 'destroy']);
        });

        Route::prefix('guildbooks')->group(function () {
            Route::get('/', [GuildbookController::class, 'index']);
            Route::post('/', [GuildbookController::class, 'store']);
            Route::put('/{id}', [GuildbookController::class, 'update']);
            Route::delete('/{id}', [GuildbookController::class, 'destroy']);
        });

        Route::prefix('cheats')->group(function () {
            Route::get('/', [CheatController::class, 'index']);
            Route::post('/', [CheatController::class, 'store']);
            Route::put('/{id}', [CheatController::class, 'update']);
            Route::delete('/{id}', [CheatController::class, 'destroy']);
        });
    });
});
