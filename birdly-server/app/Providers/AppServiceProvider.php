<?php

namespace App\Providers;

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
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void {
        //
    }
}
