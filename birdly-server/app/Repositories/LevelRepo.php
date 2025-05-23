<?php

namespace App\Repositories;

use App\Models\Level;

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

    public function attachQuestion(int $LevelId, int $questionId): bool {
        $level = Level::find($LevelId);
        if (!$level) return false;

        if (!$level->questions->contains($questionId)) {
            return false;
        }

        $level->questions()->attach($questionId);
        return true;
    }

    public function bulkAttach(int $LevelId, array $questionIds) {
        $level = Level::find($LevelId);
        if (!$level) return;
        $existing = $level->questions()->pluck('questions.id')->toArray();
        $new = array_diff($questionIds, $existing);

        if (empty($new)) return;
        $level->questions()->attach($new);

        return $new;
    }

    public function detachQuestion(int $LevelId, int $questionId): bool {
        $level = Level::find($LevelId);
        if (!$level) false;

        if (!$level->questions->contains($questionId)) {
            return false;
        }

        $level->questions()->detach($questionId);
        return true;
    }
}
