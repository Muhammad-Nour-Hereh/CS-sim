<?php

namespace App\Services;

use App\Traits\AiContextBuilder;
use OpenAI;

class OpenAIService {
    use AiContextBuilder;

    protected $client;

    public function __construct(string $apiKey, string $language = 'python', string $task = 'q_and_a') {
        $this->client = OpenAI::client($apiKey);
        $this->setLanguage($language);
        $this->addTaskContext($task)->addLanguageContext();
    }

    public function generateText(string $prompt): string {
        $context = $this->buildContext();
        $response = $this->client->chat()->create([
            'model' => 'gpt-4o',
            'messages' => [
                ['role' => 'system', 'content' => $context],
                ['role' => 'user', 'content' => $prompt]
            ],
        ]);

        return $response->choices[0]->message->content;
    }
}
