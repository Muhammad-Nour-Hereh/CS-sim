<?php

namespace App\Repositories;

use App\Models\Course;
use App\Models\Progress;
use App\Models\User;

class UserRepo
{
    public function subscribe(User $user, int $courseId) {
        $course = Course::find($courseId);
        if (!$course) return ['status' => 'not_found'];

        if ($user->courses()->where('course_id', $courseId)->exists())
            return ['status' => 'already_subscribed'];

        $progress = Progress::create();
        $user->courses()->attach($courseId, ['progress_id' => $progress->id]);

        return ['status' => 'subscribed'];
    }

    public function unsubscribe(User $user, int $courseId) {
        $course = Course::find($courseId);
        if (!$course) return ['status' => 'not_found'];

        if (!$user->courses()->where('course_id', $courseId)->exists())
            return ['status' => 'not_subscribed'];

        $user->courses()->detach($courseId);
        return ['status' => 'unsubscribed'];
    }
}
