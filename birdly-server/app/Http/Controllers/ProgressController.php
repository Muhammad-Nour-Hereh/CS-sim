<?php

namespace App\Http\Controllers;

use App\Repositories\ProgressRepo;
use Illuminate\Http\Request;

class ProgressController extends Controller {

    public function __construct(private ProgressRepo $progressRepo) {
    }

    public function getMistakes($progressId) {
        $data = $this->progressRepo->getMistakes($progressId);
        return $data ? $this->successResponse($data) : $this->notFoundResponse();
    }

    public function addMistake($progressId, $questionId) {
        $ok = $this->progressRepo->addMistake($progressId, $questionId);
        return $ok ? $this->createdResponse() : $this->notFoundResponse();
    }

    public function setMistakeCount(Request $request, $progressId, $questionId) {
        $count = $request->input('count');

        if (!is_numeric($count)) {
            return $this->unprocessableContentResponse(['count' => 'Count must be numeric']);
        }

        $ok = $this->progressRepo->setMistakeCount($progressId, $questionId, $count);
        return $ok ? $this->noContentResponse() : $this->notFoundResponse();
    }

    public function removeMistake($progressId, $questionId) {
        $ok = $this->progressRepo->removeMistake($progressId, $questionId);
        return $ok ? $this->noContentResponse() : $this->notFoundResponse();
    }

    public function getCompletedLevels($progressId) {
        $data = $this->progressRepo->getCompletedLevels($progressId);
        return $data ? $this->successResponse($data) : $this->notFoundResponse();
    }

    public function completeLevel($progressId, $levelId) {
        $res = $this->progressRepo->completeLevel($progressId, $levelId);

        return match ($res) {
            true => $this->createdResponse(),
            'already' => $this->conflictResponse('this level already completed'),
            default => $this->notFoundResponse()
        };
    }

    public function uncompleteLevel($progressId, $levelId) {
        $ok = $this->progressRepo->uncompleteLevel($progressId, $levelId);
        return $ok ? $this->noContentResponse() : $this->notFoundResponse();
    }
}
