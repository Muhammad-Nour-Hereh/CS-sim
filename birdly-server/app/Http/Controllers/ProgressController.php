<?php

namespace App\Http\Controllers;

use App\Models\Progress;

class ProgressController extends Controller {

    public function getMistakes($progressId) {
        $progress = Progress::find($progressId);

        if (!$progress)
            return $this->notFoundResponse();

        $data = $progress->mistakes()->get();

        return $this->successResponse($data);
    }

    public function addMistake($progressId, $questionId) {
        // TODO: Implement logic to add a mistake for the given question
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
