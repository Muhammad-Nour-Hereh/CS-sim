<?php

namespace App\Http\Controllers;

use App\Http\Requests\PromptRequest;
use App\Models\Guildbook;
use App\Models\Snippet;
use App\Services\GuildbookFileService;
use App\Services\OpenAIService;

class ChatbotController extends Controller {

    public function __construct(
        protected OpenAIService $openai,
        protected GuildbookFileService $fileService
    ) {
    }

    public function chat(PromptRequest $request) {
        $res = $this->openai->generateText($request->prompt);

        return $this->successResponse(['response' => $res]);
    }

    public function snippet(int $id) {
        $res = $this->openai->historyPrompt($id);
        if (!$res) return $this->notFoundResponse();

        return $this->successResponse(['response' => $res]);
    }

    public function guildbook(PromptRequest $request, int $id) {
        $prompt = $request->prompt;
        $res = $this->openai->guildbookPrompt($id, $prompt);
        if (!$res) return $this->notFoundResponse();

        return $this->successResponse(['response' => $res]);
    }
}
