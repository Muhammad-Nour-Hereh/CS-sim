<?php

namespace App\Services;

use App\Traits\AiContextBuilder;
use OpenAI;

class OpenAIService {
    use AiContextBuilder;

    protected $client;

    public function __construct(string $apiKey) {
        $this->client = OpenAI::client($apiKey);
    }

    public function generateText(string $prompt): string {
        $this->setLanguage('python');
        $this->addTaskContext('q_and_a')->addLanguageContext();
        $context = $this->buildContext();
        $response = $this->client->chat()->create([
            // 'model' => 'gpt-4o',
            'model' => 'gpt-3.5-turbo',
            'messages' => [
                ['role' => 'system', 'content' => $context],
                ['role' => 'user', 'content' => $prompt]
            ],
        ]);

        return $response->choices[0]->message->content;
    }

    public function historyPrompt(string $prompt, array $history): array {
        $this->setLanguage('python');
        $this->addTaskContext('q_and_a')->addLanguageContext();
        $context = $this->buildContext();

        $lastUserMessage = null;
        $lastAssistantResponse = null;

        // look back for the last response and prompt
        for ($i = count($history) - 1; $i >= 1; $i--) {
            if (
                $history[$i]['role'] === 'assistant' &&
                $history[$i - 1]['role'] === 'user'
            ) {
                $lastUserMessage = $history[$i - 1]['content'];
                $lastAssistantResponse = $history[$i]['content'];
                break;
            }
        }

        // if it is the same return them
        if ($lastUserMessage !== null && trim($prompt) === trim($lastUserMessage))
            return [$lastAssistantResponse, $history];


        $newHistory = array_merge(
            $history,
            [['role' => 'user', 'content' => $prompt]]
        );

        $response = $this->client->chat()->create([
            // 'model' => 'gpt-4o',
            // 'model' => 'gpt-o3',
            'model' => 'gpt-3.5-turbo',
            'messages' =>
            array_merge(
                [['role' => 'system', 'content' => $context]],
                $newHistory
            ),
        ]);

        $res = $response->choices[0]->message->content;
        $newHistory[] = ['role' => 'assistant', 'content' => $res];
        $newHistory = array_slice($newHistory, -10);
        return [$res, $newHistory];
    }

    public function guildbookPrompt(string $content, string $prompt, array $history): array {
        $this->setLanguage('python');
        $this->addTaskContext('q_and_a')->addLanguageContext();
        $context = $this->buildContext();

        $newHistory = array_merge(
            $history,
            [['role' => 'user', 'content' => 'content: \n' . $prompt]]
        );

        $response = $this->client->chat()->create([
            // 'model' => 'gpt-4o',
            'model' => 'gpt-3.5-turbo',
            'messages' =>
            array_merge(
                [
                    ['role' => 'system', 'content' => $context],
                    ['role' => 'system', 'content' => $content]
                ],
                $newHistory
            ),
        ]);

        $res = $response->choices[0]->message->content;
        $newHistory[] = ['role' => 'assistant', 'content' => $res];
        $newHistory = array_slice($newHistory, -10);
        return [$res, $newHistory];
    }

    public function checkAnswer(string $userAnswer, string $question, string $correctAnswer): bool {
        $this->setLanguage('python');
        $this->addTaskContext('check')->addLanguageContext();
        $this->addQuestion($question, $correctAnswer);

        $context = $this->buildContext();
        $response = $this->client->chat()->create([
            // 'model' => 'gpt-4o',
            'model' => 'gpt-3.5-turbo',
            'messages' => [
                ['role' => 'system', 'content' => $context],
                ['role' => 'user', 'content' => $userAnswer]
            ],
        ]);

        $content = trim($response['choices'][0]['message']['content'] ?? '');

        if ($content === 'true') {
            return true;
        } elseif ($content === 'false') {
            return false;
        } else {
            throw new \RuntimeException("Invalid response from AI: '$content'");
        }

        return $content;
    }
}
