<?php

namespace Database\Factories;

use App\Models\ChatHistory;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Snippet>
 */
class SnippetFactory extends Factory {
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array {
        $history = ChatHistory::factory();

        return [
            'user_id' => 1,
            'chat_history_id' => $history,
            'title' => "Example Snippet",
            'language' => 'python',
            'code' => "print('Hello, world!')",
        ];
    }
}
