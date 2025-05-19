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
        $this->app->singleton(SnippetRunnerService::class, fn() => new SnippetRunnerService());
        $this->app->singleton(GuildbookFileService::class, fn() => new GuildbookFileService());
        $this->app->singleton(CheatFileService::class, fn() => new CheatFileService());
        $this->app->singleton(AuthService::class, fn() => new AuthService());
        $this->app->singleton(OpenAIService::class, function ($app) {
            return new OpenAIService(
                $app->make(GuildbookFileService::class),
                config('services.openai.api_key')
            );
        });
    }
}
