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

    public function create(array $data): int {
        return Level::create($data)->id;
    }

    public function update(int $id, array $data): bool {
        $level = $this->find($id);
        return $level?->update($data);
    }

    public function delete(int $id): bool {
        $level = $this->find($id);
        return $level?->delete();
    }

    public function questions(int $id) {
        $level = Level::find($id);
        if (!$level) return;
        
        return $level->questions()->get()->map(function ($q) {
            $q->content = json_decode($q->content, true);
            return $q;
        });
    }
}
