<?php

namespace App\Http\Controllers;

use App\Models\Progress;
use App\Models\Question;
use Illuminate\Http\Request;

use function PHPUnit\Framework\isNumeric;

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
