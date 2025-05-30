<?php

namespace App\Repositories;

use App\Models\Level;
use App\Models\Progress;
use App\Models\Question;

class ProgressRepo {

    public function find(int $id): ?Progress {
        return Progress::find($id);
    }

    public function getMistakes(int $progressId) {
        $progress = $this->find($progressId);
        return $progress?->mistakes()->get();
    }

    public function addMistake(int $progressId, int $questionId): bool {
        $progress = Progress::find($progressId);
        $question = Question::find($questionId);

        if (!$progress || !$question) return false;

        $mistake = $progress->mistakes()->where('question_id', $questionId)->first();

        if ($mistake) {
            $progress->mistakes()->updateExistingPivot($questionId, [
                'count' => $mistake->pivot->count + 1
            ]);
        } else {
            $progress->mistakes()->attach($questionId);
        }

        return true;
    }

    public function setMistakeCount(int $progressId, int $questionId, int $count): bool {
        $progress = Progress::find($progressId);
        $question = Question::find($questionId);

        if (!$progress || !$question) return false;

        $mistake = $progress->mistakes()->where('question_id', $questionId)->first();
        if (!$mistake) return false;

        $progress->mistakes()->updateExistingPivot($questionId, ['count' => $count]);
        return true;
    }

    public function removeMistake(int $progressId, int $questionId): bool {
        $progress = Progress::find($progressId);
        $question = Question::find($questionId);

        if (!$progress || !$question) return false;

        $mistake = $progress->mistakes()->where('question_id', $questionId)->first();
        if (!$mistake) return false;

        $progress->mistakes()->detach($questionId);
        return true;
    }

    public function getCompletedLevels(int $progressId) {
        $progress = $this->find($progressId);
        return $progress?->completedLevels()->get();
    }

    public function completeLevel(int $progressId, int $levelId): bool|string {
        $progress = Progress::find($progressId);
        $level = Level::find($levelId);

        if (!$progress || !$level) return false;

        if ($progress->completedLevels()->where('level_id', $levelId)->exists()) {
            return 'already';
        }

        $progress->completedLevels()->attach($levelId);
        return true;
    }

    public function uncompleteLevel(int $progressId, int $levelId): bool {
        $progress = Progress::find($progressId);
        $level = Level::find($levelId);

        if (!$progress || !$level) return false;

        if (!$progress->completedLevels()->where('level_id', $levelId)->exists()) {
            return false;
        }

        $progress->completedLevels()->detach($levelId);
        return true;
    }

}
