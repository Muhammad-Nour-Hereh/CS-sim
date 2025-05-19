<?php

namespace App\Providers;

use App\Repositories\CheatRepo;
use App\Repositories\CourseRepo;
use App\Repositories\GuildbookRepo;
use Illuminate\Support\ServiceProvider;

class RepoProvider extends ServiceProvider {

    public function register(): void {
        $this->app->singleton(CheatRepo::class, function () {
            return new CheatRepo();
        });

        $this->app->singleton(CourseRepo::class, function () {
            return new CourseRepo();
        });

        $this->app->singleton(GuildbookRepo::class, function () {
            return new GuildbookRepo();
        });
    }
}
