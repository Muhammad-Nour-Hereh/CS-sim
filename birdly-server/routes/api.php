<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ChatbotController;
use App\Http\Controllers\CheatController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\GuildbookController;
use App\Http\Controllers\LevelController;
use App\Http\Controllers\ProgressController;
use App\Http\Controllers\QuestionController;
use App\Http\Controllers\SnippetController;
use App\Http\Controllers\SnippetRunnerController;
use App\Http\Controllers\UserController;
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

            Route::post('/run/{id}', [SnippetRunnerController::class, 'runSnippet']);
            Route::post('/chat/{id}', [ChatbotController::class, 'snippet']);

        });

        Route::prefix('courses')->group(function () {
            Route::get('/{id}', [CourseController::class, 'show']);
        });

        Route::prefix('guildbooks')->group(function () {
            Route::get('/{id}', [GuildbookController::class, 'show']);
            Route::post('/chat/{id}', [ChatbotController::class, 'guildbook']);
        });

        Route::prefix('cheats')->group(function () {
            Route::get('/{id}', [CheatController::class, 'show']);
        });

        Route::prefix('levels')->group(function () {
            Route::get('/{id}', [LevelController::class, 'show']);

            // questions relationship
            Route::get('/{levelId}/questions', [LevelController::class, 'questions']);
        });

        Route::prefix('questions')->group(function () {
            Route::get('/{id}', [QuestionController::class, 'show']);
            Route::post('/check/{id}', [QuestionController::class, 'check']);

        });

        Route::prefix('users')->group(function () {
            Route::get('/courses', [UserController::class, 'getSubscribtions']);
            Route::post('/courses/{course}/subscribe', [UserController::class, 'subscribe']);
            Route::delete('/courses/{course}/subscribe', [UserController::class, 'unsubscribe']);
        });

        Route::prefix('progress')->group(function () {
            Route::get('{progressId}/mistakes', [ProgressController::class, 'getMistakes']);
            Route::post('{progressId}/questions/{questionId}/mistakes', [ProgressController::class, 'addMistake']);
            Route::patch('{progressId}/questions/{questionId}/mistakes', [ProgressController::class, 'setMistakeCount']);
            Route::delete('{progressId}/questions/{questionId}/mistakes', [ProgressController::class, 'removeMistake']);

            Route::get('{progressId}/completed', [ProgressController::class, 'getCompletedLevels']);
            Route::post('{progressId}/levels/{levelId}/complete', [ProgressController::class, 'completeLevel']);
            Route::delete('{progressId}/levels/{levelId}/complete', [ProgressController::class, 'uncompleteLevel']);
        });

        Route::prefix('chat')->group(function () {
            Route::post('/', [ChatbotController::class, 'chat']);
        });

        Route::prefix('run')->group(function () {
            Route::post('/', [SnippetRunnerController::class, 'run']);
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

        Route::prefix('levels')->group(function () {
            Route::get('/', [LevelController::class, 'index']);
            Route::post('/', [LevelController::class, 'store']);
            Route::put('/{id}', [LevelController::class, 'update']);
            Route::delete('/{id}', [LevelController::class, 'destroy']);

            // questions relationship
            Route::post('/{levelId}/questions/bulk', [LevelController::class, 'bulkAttachQuestions']);
            Route::post('/{levelId}/questions/{questionId}', [LevelController::class, 'attachQuestions']);
            Route::delete('/{levelId}/questions/{questionId}', [LevelController::class, 'detachQuestion']);
        });

        Route::prefix('questions')->group(function () {
            Route::get('/', [QuestionController::class, 'index']);
            Route::post('/', [QuestionController::class, 'store']);
            Route::put('/{id}', [QuestionController::class, 'update']);
            Route::delete('/{id}', [QuestionController::class, 'destroy']);
        });
    });
});
