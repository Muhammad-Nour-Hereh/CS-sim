<?php

namespace App\Http\Controllers;

use App\Services\OpenAIService;
use Illuminate\Http\Request;

class ChatbotController extends Controller {

    public function __construct(protected OpenAIService $openai) {
    }

    public function chat(Request $request) {
        $request->validate([
            'prompt' => 'required|string',
        ]);

        $response = $this->openai->generateText($request->prompt);
        return response()->json(['response' => $response]);
    }
}
