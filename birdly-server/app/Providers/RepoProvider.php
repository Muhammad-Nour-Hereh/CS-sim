<?php

namespace App\Providers;

use App\Repositories\CheatRepo;
use App\Repositories\CourseRepo;
use App\Repositories\GuildbookRepo;
use App\Repositories\LevelRepo;
use App\Repositories\ProgressRepo;
use App\Repositories\QuestionRepo;
use App\Repositories\SnippetRepo;
use App\Repositories\UserRepo;
use Illuminate\Support\ServiceProvider;

class RepoProvider extends ServiceProvider {

    public function register(): void {
        $this->app->singleton(CheatRepo::class, fn() => new CheatRepo());
        $this->app->singleton(CourseRepo::class, fn() => new CourseRepo());
        $this->app->singleton(GuildbookRepo::class, fn() => new GuildbookRepo());
        $this->app->singleton(LevelRepo::class, fn() => new LevelRepo());
        $this->app->singleton(ProgressRepo::class, fn() => new ProgressRepo());
        $this->app->singleton(QuestionRepo::class, fn() => new QuestionRepo());
        $this->app->singleton(SnippetRepo::class, fn() => new SnippetRepo());
        $this->app->singleton(UserRepo::class, fn() => new UserRepo());
    }
}
