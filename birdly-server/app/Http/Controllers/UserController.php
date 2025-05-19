<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\Progress;
use App\Repositories\UserRepo;
use Illuminate\Http\Request;

class UserController extends Controller {

    public function __construct(protected UserRepo $users) {
    }

    public function getSubscribtions(Request $request) {
        return $this->successResponse($this->users->getSubscriptions($request->user()));
    }

    public function subscribe(Request $request, $courseId) {
        $result = $this->users->subscribe($request->user(), $courseId);
    
        return match ($result['status']) {
            'not_found' => $this->notFoundResponse(),
            'already_subscribed' => $this->conflictResponse(['you already subscribed to this course']),
            'subscribed' => $this->createdResponse('the course has been subscribed'),
        };
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
