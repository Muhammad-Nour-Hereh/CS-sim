<?php

namespace App\Repositories;

use App\Models\Cheat;

class CheatRepo {
    public function create(int $courseId, string $title, string $path) {
        Cheat::create([
            'course_id' => $courseId,
            'title'     => $title,
            'path'      => $path,
        ]);
    }
}
