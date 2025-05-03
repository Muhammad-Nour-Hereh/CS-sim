<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\Progress;
use Illuminate\Http\Request;

class UserController extends Controller {

    public function getSubscribtions(Request $request) {
        $data = $request->user()->courses()->get();

        return $this->successResponse($data);
    }

    public function subscribe(Request $request, $courseId) {
        $user = $request->user();

        $course = Course::find($courseId);

        if (!$course)
            return $this->notFoundResponse();

        if ($user->courses()->where('course_id', $courseId)->exists()) {
            return $this->conflictResponse(['you already subscribed to this couse']);
        }

        $progress = Progress::create();

        $user->courses()->attach($courseId, ['progress_id' => $progress->id]);
        return $this->createdResponse('the course have been subscribed');
    }

    public function unsubscribe(Request $request, $courseId) {
        $user = $request->user();

        $course = Course::find($courseId);

        if (!$course)
            return $this->notFoundResponse();

        if (!$user->courses()->where('course_id', $courseId)->exists()) {
            return $this->conflictResponse(['you are not subscribed to this course']);
        }

        $user->courses()->detach($courseId);
        return $this->createdResponse('the course have been unsubscribed');
    }
}
