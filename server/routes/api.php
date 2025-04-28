<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\SnippetController;
use Illuminate\Support\Facades\Route;

Route::group(["prefix" => "v1"], function () {

    Route::prefix('auth')->group(function () {
        Route::post('/login', [AuthController::class, 'login']);
        Route::post('/register', [AuthController::class, 'register']);

        // Protected routes (require JWT token)
        Route::middleware('jwt')->group(function () {
            Route::get('/me', [AuthController::class, 'me']);
            Route::post('/logout', [AuthController::class, 'logout']);


            Route::get('/snippets', [SnippetController::class, 'index']);    // List all snippets
            Route::post('/snippets', [SnippetController::class, 'store']);   // Create new snippet
            Route::get('/snippets/{id}', [SnippetController::class, 'show']); // Show specific snippet
            Route::put('/snippets/{id}', [SnippetController::class, 'update']); // Update snippet
            Route::delete('/snippets/{id}', [SnippetController::class, 'destroy']); // Soft delete snippet
        });
    });
});
