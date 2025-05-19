<?php

namespace App\Http\Controllers;

use App\Http\Requests\BulkAttackQuestionRequest;
use App\Http\Requests\LevelRequest;
use App\Models\Level;
use App\Models\Question;
use App\Repositories\LevelRepo;

class LevelController extends Controller {

    public function __construct(protected LevelRepo $levelRepo) {
    }

    public function index() {
        return $this->successResponse($this->levelRepo->all());
    }

    public function store(LevelRequest $request) {
        Level::create($request->validated());

        return $this->createdResponse();
    }

    public function show($id) {
        $level = Level::find($id);

        if (!$level)
            return $this->notFoundResponse();

        return $this->successResponse($level);
    }
    public function update(LevelRequest $request, $id) {
        $level = Level::find($id);

        if (!$level)
            return $this->notFoundResponse();

        $level->update($request->validated());

        return $this->noContentResponse();
    }
    public function destroy($id) {
        $level = Level::find($id);

        if (!$level)
            return $this->notFoundResponse();

        $level->delete($id);
        return $this->noContentResponse();
    }

    public function questions($levelId) {
        $level = Level::find($levelId);

        if (!$level)
            return $this->notFoundResponse();

        $questions = $level->questions()->get();
        $questions = $level->questions()->get()->map(function ($question) {
            $question->content = json_decode($question->content, true);
            return $question;
        });
        return $this->successResponse($questions);
    }

    public function attachQuestions($levelId, $questionId) {
        $level = Level::find($levelId);
        $question = Question::find($questionId);

        if (!$level || !$question)
            return $this->notFoundResponse();

        if ($level->questions()->where('question_id', $questionId)->exists()) {
            return $this->conflictResponse(['Question already attached to this level']);
        }

        $level->questions()->attach($questionId);
        return $this->createdResponse('Question attached successfully');
    }

    public function bulkAttachQuestions(BulkAttackQuestionRequest $request, $levelId) {

        $validated = $request->validated();

        $level = Level::find($levelId);

        if (!$level)
            return $this->notFoundResponse();

        $newQuestionIds = array_diff(
            $validated['questions_ids'],
            $level->questions()->pluck('questions.id')->toArray()
        );

        if (empty($newQuestionIds)) {
            return $this->conflictResponse('All questions are already attached to this level');
        }

        $level->questions()->attach($newQuestionIds);
        return $this->createdResponse('Questions attached successfully');
    }

    public function detachQuestion($levelId, $questionId) {

        $level = Level::find($levelId);
        $question = Question::find($questionId);

        if (!$level || !$question)
            return $this->notFoundResponse();

        if (!$level->questions()->where('question_id', $questionId)->exists()) {
            return $this->notFoundResponse();
        }

        $level->questions()->detach($questionId);
        return $this->noContentResponse();
    }
}
