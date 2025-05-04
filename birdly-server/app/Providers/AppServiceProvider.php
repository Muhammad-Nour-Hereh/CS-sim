<?php

namespace App\Providers;

use App\Services\CheatFileService;
use App\Services\GuildbookFileService;
use App\Services\OpenAIService;
use App\Services\SnippetRunnerService;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider {
    /**
     * Register any application services.
     */
    public function register(): void {
        $this->app->singleton(SnippetRunnerService::class, function ($app) {
            return new SnippetRunnerService();
        });

        $this->app->singleton(GuildbookFileService::class, function ($app) {
            return new GuildbookFileService();
        });

        $this->app->singleton(CheatFileService::class, function ($app) {
            return new CheatFileService();
        });
        
        $this->app->singleton(OpenAIService::class, function ($app) {
            return new OpenAIService(config('openai.api_key'));
        });
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void {
        //
    }
}
