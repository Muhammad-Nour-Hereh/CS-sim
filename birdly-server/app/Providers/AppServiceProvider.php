<?php

namespace App\Providers;

use App\Services\AuthService;
use App\Services\CheatFileService;
use App\Services\GuildbookFileService;
use App\Services\OpenAIService;
use App\Services\SnippetRunnerService;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider {

    public function register(): void {
        $this->app->singleton(SnippetRunnerService::class, function () {
            return new SnippetRunnerService();
        });

        $this->app->singleton(GuildbookFileService::class, function () {
            return new GuildbookFileService();
        });

        $this->app->singleton(CheatFileService::class, function () {
            return new CheatFileService();
        });

        $this->app->singleton(OpenAIService::class, function () {
            return new OpenAIService(config('services.openai.api_key'));
        });

        $this->app->singleton(AuthService::class, function () {
            return new AuthService();
        });
    }
}
