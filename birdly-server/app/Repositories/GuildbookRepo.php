<?php

namespace App\Repositories;

use App\Models\Guildbook;

class GuildbookRepo {

    public function all() {
        return Guildbook::all();
    }

    public function find(int $id) {
        return Guildbook::find($id);
    }

    public function create(int $courseId, string $title, string $path): int {
        $guildbook = Guildbook::create([
            'course_id' => $courseId,
            'title'     => $title,
            'path'      => $path,
        ]);

        return $guildbook->id;
    }

    public function update(int $id, int $courseId, string $title): void {
        $guildbook = $this->find($id);
        if ($guildbook) {
            $guildbook->update([
                'course_id' => $courseId,
                'title'     => $title,
            ]);
        }
    }
}
