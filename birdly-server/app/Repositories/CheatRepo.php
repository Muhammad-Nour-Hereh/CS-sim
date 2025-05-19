<?php

namespace App\Repositories;

use App\Models\Cheat;

class CheatRepo {

    public function all() {
        return Cheat::all();
    }

    public function find(int $id) {
        $cheat = Cheat::find($id);

        return $cheat;
    }

    public function create(int $courseId, string $title, string $path) {
        $new = Cheat::create([
            'course_id' => $courseId,
            'title'     => $title,
            'path'      => $path,
        ]);

        return $new->id;
    }

    public function update($id, $courseId, $title) {
        $cheat = Cheat::find($id);
        if (!$cheat) return;

        $cheat = $cheat->update([
            'course_id' => $courseId,
            'title'     => $title,
        ]);

        return $cheat;
    }

    public function delete($id) {
        $cheat = Cheat::find($id);
        if (!$cheat) return;
        $path = $cheat->path;
        if ($cheat) {
            $cheat->delete();
        }
        return $path;
    }
}
