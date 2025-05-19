<?php

namespace App\Http\Controllers;

use App\Http\Requests\PromptRequest;
use App\Http\Requests\QuestionRequest;
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
        $this->questions->create($request->validated());
        return $this->createdResponse();
    }

    public function show($id) {
        $question = $this->questions->find($id);
        if (!$question) return $this->notFoundResponse();
        return $this->successResponse($question);
    }

    public function update(QuestionRequest $request, $id) {
        $question = $this->questions->update($id, $request->validated());
        if (!$question) return $this->notFoundResponse();
        return $this->noContentResponse();
    }

    public function destroy($id) {
        $deleted = $this->questions->delete($id);
        if (!$deleted) return $this->notFoundResponse();
        return $this->noContentResponse();
    }


    public function check(PromptRequest $request, $id) {
        $question = $this->questions->find($id);
        if (!$question) return $this->notFoundResponse();

        $userAnswer = $request->prompt;
        $title = $question->title;
        $correctAnswer = json_decode($question->content)->correctAnswer;

        $correct = $this->openai->checkAnswer($userAnswer,  $title,  $correctAnswer);

        return $this->successResponse($correct);
    }
}
