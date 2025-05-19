<?php

namespace App\Http\Controllers;

use App\Models\Level;
use App\Models\Progress;
use App\Models\Question;
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
        $progress = Progress::find($progressId);

        if (!$progress)
            return $this->notFoundResponse();

        $data = $progress->completedLevels()->get();

        return $this->successResponse($data);
    }

    public function completeLevel($progressId, $levelId) {
        $progress = Progress::find($progressId);
        $level = Level::find($levelId);

        if (!$progress || !$level)
            return $this->notFoundResponse();

        $completed = $progress->completedLevels()->where('level_id', $levelId)->first();

        if ($completed) {
            return $this->conflictResponse('this level already completed');
        }

        $progress->completedLevels()->attach($levelId);

        return $this->createdResponse();
    }

    public function uncompleteLevel($progressId, $levelId) {
        $progress = Progress::find($progressId);
        $level = Level::find($levelId);

        if (!$progress || !$level)
            return $this->notFoundResponse();

        $completed = $progress->completedLevels()->where('level_id', $levelId)->first();

        if (!$completed) {
            return $this->notFoundResponse();
        }

        $progress->completedLevels()->detach($levelId);

        return $this->noContentResponse();
    }
}
