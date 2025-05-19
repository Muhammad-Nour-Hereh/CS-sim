<?php

namespace App\Repositories;

use App\Models\Level;
use App\Models\Question;


class LevelRepo {

    public function all() {
        return Level::all();
    }

    public function find(int $id): ?Level {
        return Level::find($id);
    }
}
