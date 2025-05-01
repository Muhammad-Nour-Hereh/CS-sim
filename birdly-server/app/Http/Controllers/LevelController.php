<?php

namespace App\Http\Controllers;

use App\Http\Requests\LevelRequest;
use App\Models\Level;
use App\Models\Question;
use Illuminate\Support\Facades\Request;

class LevelController extends Controller {

    public function index() {
        return $this->successResponse(Level::All());
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

    public function questions(Level $level) {
        return $this->successResponse([
            'questions' => $level->questions()->get()
        ]);
    }

    public function attachQuestions(Request $request, Level $level) {
        $validated = $request->validate([
            'question_id' => 'required|exists:questions,id'
        ]);

        if ($level->questions()->where('question_id', $validated['question_id'])->exists()) {
            return $this->conflictResponse('Question already attached to this level');
        }

        $level->questions()->attach($validated['question_id']);
        return $this->createdResponse('Question attached successfully');
    }

    public function bulkAttachQuestions(Request $request, Level $level) {
        $validated = $request->validate([
            'question_ids' => 'required|array',
            'question_ids.*' => 'exists:questions,id'
        ]);

        $newQuestionIds = array_diff(
            $validated['question_ids'],
            $level->questions()->pluck('questions.id')->toArray()
        );

        if (empty($newQuestionIds)) {
            return $this->conflictResponse('All questions are already attached to this level');
        }

        $level->questions()->attach($newQuestionIds);
        return $this->createdResponse('Questions attached successfully');
    }

    public function detachQuestion(Level $level, Question $question) {
        if (!$level->questions()->where('question_id', $question->id)->exists()) {
            return $this->notFoundResponse();
        }

        $level->questions()->detach($question->id);
        return $this->noContentResponse();
    }
}
