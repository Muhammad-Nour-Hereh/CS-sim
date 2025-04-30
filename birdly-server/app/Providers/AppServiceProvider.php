<?php

namespace App\Providers;

use App\Services\CheatsFileService;
use App\Services\GuildbookFileService;
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

        $this->app->singleton(CheatsFileService::class, function ($app) {
            return new CheatsFileService();
        });
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void {
        //
    }
}
