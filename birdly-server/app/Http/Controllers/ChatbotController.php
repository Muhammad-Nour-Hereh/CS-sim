<?php

namespace App\Http\Controllers;

use App\Http\Requests\PromptRequest;
use App\Models\Guildbook;
use App\Models\Snippet;
use App\Services\OpenAIService;
use Illuminate\Http\Request;

class ChatbotController extends Controller {

    public function __construct(protected OpenAIService $openai) {
    }

    public function chat(PromptRequest $request) {

        $res = $this->openai->generateText($request->prompt);
        return $this->successResponse(['response' => $res]);
    }

    public function snippet(int $id) {
        $snippet = Snippet::find($id);
        $code = $snippet->code;
        $history = $snippet->history;

        [$res, $newHistory] = $this->openai->historyPrompt($code, $history);

        $snippet->update(['history' => $newHistory]);
        return $this->successResponse(['response' => $res]);
    }

    public function guildbook(PromptRequest $request, int $id) {

        $prompt = $request->prompt;
        $guildbook = Guildbook::find($id);
        $content = $guildbook->content;
        $history = $guildbook->history;

        [$res, $newHistory] = $this->openai->guildbookPrompt($content, $prompt, $history);

        $guildbook->update(['history' => $newHistory]);
        return $this->successResponse(['response' => $res]);
    }
}
