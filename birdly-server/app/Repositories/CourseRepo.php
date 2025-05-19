<?php

namespace App\Repositories;

use App\Models\Course;

class CourseRepo {
    public function all() {
        return Course::all();
    }

    public function find(int $id) {
        return Course::find($id);
    }
}
