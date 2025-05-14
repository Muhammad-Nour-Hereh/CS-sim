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
        $snippet = Snippet::find($id);
        $code = $snippet->code;
        $history = json_decode($snippet->history);

        [$res, $newHistory] = $this->openai->historyPrompt($code, $history);

        $snippet->update(['history' => json_encode($newHistory)]);
        return response()->json(['response' => $res]);
    }
}
