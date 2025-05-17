<?php

namespace App\Http\Controllers;

use App\Http\Requests\PromptRequest;
use App\Http\Requests\QuestionRequest;
use App\Models\Question;
use App\Services\OpenAIService;

class QuestionController extends Controller {

    public function __construct(protected OpenAIService $openai) {
    }


    public function index() {
        return $this->successResponse(Question::All());
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
        $Question = Question::find($id);
        if (!$Question) return $this->notFoundResponse();

        // $this->openai->check($Question, $request->validated());

        $correct = true;
        return $this->successResponse($correct);
    }
}
