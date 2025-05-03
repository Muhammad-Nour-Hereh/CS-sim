<?php

namespace App\Http\Controllers;

use App\Models\Progress;
use App\Models\Question;

class ProgressController extends Controller {

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

    public function setMistakeCount($progressId, $questionId) {
        // TODO: Implement logic to update mistake count (if applicable)
    }

    public function removeMistake($progressId, $questionId) {
        // TODO: Implement logic to remove a mistake for the given question
    }

    public function getCompletedLevels($progressId) {
        // TODO: Implement logic to get completed levels for the given progress
    }

    public function completeLevel($progressId, $levelId) {
        // TODO: Implement logic to mark level as completed
    }

    public function uncompleteLevel($progressId, $levelId) {
        // TODO: Implement logic to unmark level as completed
    }
}
