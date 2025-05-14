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
}
