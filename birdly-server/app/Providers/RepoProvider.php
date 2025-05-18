<?php

namespace App\Providers;

use App\Repositories\CheatRepo;
use Illuminate\Support\ServiceProvider;

class RepoProvider extends ServiceProvider {

    public function register(): void {
        $this->app->singleton(CheatRepo::class, function () {
            return new CheatRepo();
        });
    }
}
