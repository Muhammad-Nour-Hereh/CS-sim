<?php

namespace App\Repositories;

use App\Models\Course;

class CourseRepo {
    public function all() {
        return Course::all();
    }
}
