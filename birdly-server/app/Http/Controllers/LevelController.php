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
        $this->levelRepo->create($request->validated());

        return $this->createdResponse();
    }


    public function show($id) {
        $level = $this->levelRepo->find($id);
        if (!$level)
            return $this->notFoundResponse();

        return $this->successResponse($level);
    }

    public function update(LevelRequest $request, $id) {
        $updated = $this->levelRepo->update($id, $request->validated());
        if (!$updated)
            return $this->notFoundResponse();

        return $this->noContentResponse();
    }

    public function destroy($id) {
        $deleted = $this->levelRepo->delete($id);
        if (!$deleted)
            return $this->notFoundResponse();

        return $this->noContentResponse();
    }

    public function questions($levelId) {
        $questions = $this->levelRepo->questions($levelId);
        if (!$questions)
            return $this->notFoundResponse();

        return $this->successResponse($questions);
    }


    public function attachQuestions($levelId, $questionId) {
        $attached = $this->levelRepo->attachQuestion($levelId, $questionId);
        if (!$attached)
            return $this->conflictResponse(['Question already attached or Level/Question not found']);

        return $this->createdResponse('Question attached successfully');
    }

    public function bulkAttachQuestions(BulkAttackQuestionRequest $request, $levelId) {
        $new = $this->levelRepo->bulkAttach($levelId, $request->validated()['questions_ids']);
        if (!$new)
            return $this->conflictResponse('All questions are already attached or level not found');

        return $this->createdResponse('Questions attached successfully');
    }

    public function detachQuestion($levelId, $questionId) {
        $detached = $this->levelRepo->detachQuestion($levelId, $questionId);
        if (!$detached)
            return $this->notFoundResponse();

        return $this->noContentResponse();
    }
}
