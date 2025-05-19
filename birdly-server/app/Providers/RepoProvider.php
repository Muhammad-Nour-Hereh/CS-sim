<?php

namespace App\Providers;

use App\Repositories\CheatRepo;
use App\Repositories\CourseRepo;
use App\Repositories\GuildbookRepo;
use App\Repositories\LevelRepo;
use App\Repositories\ProgressRepo;
use App\Repositories\QuestionRepo;
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

        $this->app->singleton(LevelRepo::class, function () {
            return new LevelRepo();
        });

        $this->app->singleton(LevelRepo::class, function () {
            return new LevelRepo();
        });

        $this->app->singleton(ProgressRepo::class, function () {
            return new ProgressRepo();
        });

        $this->app->singleton(QuestionRepo::class, function () {
            return new QuestionRepo();
        });
    }
}
