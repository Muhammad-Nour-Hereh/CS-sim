<?php

namespace App\Services;

use OpenAI;

class OpenAIService {
    protected $client;
    protected array $system;


    public function __construct(string $apiKey) {
        $this->client = OpenAI::client($apiKey);
        $this->system = [
            "role" => "system",
            "content" => "You are Birdly, a friendly and encouraging tutor..."
        ];
    }

    public function generateText(string $prompt): string {
        $response = $this->client->chat()->create([
            'model' => 'gpt-4o',
            'messages' => array_merge($this->system, [
                ['role' => 'user', 'content' => $prompt],
            ]),
        ]);

        return $response->choices[0]->message->content;
    }
}
