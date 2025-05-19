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

    public function create(string $title) {
        return Course::create(['title' => $title])->id;
    }

    public function update(int $id, string $title) {
        $course = Course::find($id);
        if (!$course) return null;

        $course->update(['title' => $title]);
        return $course;
    }
}
