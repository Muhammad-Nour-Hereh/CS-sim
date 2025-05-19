<?php

namespace App\Http\Controllers;

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
        $result = $this->users->unsubscribe($request->user(), $courseId);

        return match ($result['status']) {
            'not_found' => $this->notFoundResponse(),
            'not_subscribed' => $this->conflictResponse(['you are not subscribed to this course']),
            'unsubscribed' => $this->createdResponse('the course has been unsubscribed'),
        };
    }
}
