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
        $progress = Progress::find($progressId);

        if (!$progress)
            return $this->notFoundResponse();

        $data = $progress->mistakes()->get();

        return $this->successResponse($data);
    }

    public function addMistake($progressId, $questionId) {
        $progress = Progress::find($progressId);
        $question = Question::find($questionId);

        if (!$progress || !$question)
            return $this->notFoundResponse();

        $mistake = $progress->mistakes()->where('question_id', $questionId)->first();

        if ($mistake) {
            $progress->mistakes()->updateExistingPivot($questionId, [
                'count' => $mistake->pivot->count + 1
            ]);

            return $this->noContentResponse();
        }

        $progress->mistakes()->attach($question);

        return $this->createdResponse();
    }

    public function setMistakeCount(Request $request, $progressId, $questionId) {
        $progress = Progress::find($progressId);
        $question = Question::find($questionId);
        $count = $request->input('count');

        if (!$progress || !$question) {
            return $this->notFoundResponse();
        }

        if (!is_numeric($count)) {
            return $this->unprocessableContentResponse(["count" => 'Count must be numeric']);
        }

        $mistake = $progress->mistakes()->where('question_id', $questionId)->first();

        if (!$mistake) {
            return $this->notFoundResponse();
        }

        $progress->mistakes()->updateExistingPivot($questionId, [
            'count' => $count
        ]);

        return $this->noContentResponse();
    }

    public function removeMistake($progressId, $questionId) {
        $progress = Progress::find($progressId);
        $question = Question::find($questionId);

        if (!$progress || !$question)
            return $this->notFoundResponse();

        $mistake = $progress->mistakes()->where('question_id', $questionId)->first();

        if (!$mistake) {
            return $this->notFoundResponse();
        }

        $progress->mistakes()->detach($question);

        return $this->noContentResponse();
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
