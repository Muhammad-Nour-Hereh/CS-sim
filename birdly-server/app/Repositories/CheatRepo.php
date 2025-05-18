<?php

namespace App\Repositories;

use App\Models\Cheat;

class CheatRepo {

    public function all() {
        return Cheat::all();
    }

    public function find(int $id) {
        $cheat = cheat::find($id);

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
}
