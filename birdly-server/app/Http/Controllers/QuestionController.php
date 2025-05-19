<?php

namespace App\Http\Controllers;

use App\Http\Requests\PromptRequest;
use App\Http\Requests\QuestionRequest;
use App\Models\Question;
use App\Repositories\QuestionRepo;
use App\Services\OpenAIService;

class QuestionController extends Controller {

    public function __construct(
        protected QuestionRepo $questions,
        protected OpenAIService $openai
    ) {
    }

    public function index() {
        return $this->successResponse($this->questions->all());
    }

    public function store(QuestionRequest $request) {
        Question::create($request->validated());

        return $this->createdResponse();
    }

    public function show($id) {
        $Question = Question::find($id);

        if (!$Question)
            return $this->notFoundResponse();

        return $this->successResponse($Question);
    }
    public function update(QuestionRequest $request, $id) {
        $Question = Question::find($id);

        if (!$Question)
            return $this->notFoundResponse();

        $Question->update($request->validated());

        return $this->noContentResponse();
    }
    public function destroy($id) {
        $Question = Question::find($id);

        if (!$Question)
            return $this->notFoundResponse();

        $Question->delete($id);
        return $this->noContentResponse();
    }

    public function check(PromptRequest $request, $id) {
        $question = Question::find($id);
        if (!$question) return $this->notFoundResponse();

        $userAnswer = $request->prompt;
        $title = $question->title;
        $correctAnswer = json_decode($question->content)->correctAnswer;

        $correct = $this->openai->checkAnswer($userAnswer,  $title,  $correctAnswer);

        return $this->successResponse($correct);
    }
}
