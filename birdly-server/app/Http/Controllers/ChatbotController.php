<?php

namespace App\Http\Controllers;

use App\Models\Snippet;
use App\Services\OpenAIService;
use Illuminate\Http\Request;

class ChatbotController extends Controller {

    public function __construct(protected OpenAIService $openai) {
    }

    public function chat(Request $request) {
        $request->validate([
            'prompt' => 'string',
        ]);

        $response = $this->openai->generateText($request->prompt);
        return response()->json(['response' => $response]);
    }

    public function snippet(int $id) {
        $snippet = Snippet::get($id);
        $code = $snippet->code;
        $history = $snippet->history;

        [$res, $history] = $this->openai->historyPrompt($code, $history);
        return response()->json(['response' => $res]);
    }
}
