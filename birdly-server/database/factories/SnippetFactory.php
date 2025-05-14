<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class SnippetFactory extends Factory {

    public function definition(): array {

        return [
            'user_id' => 1,
            'title' => "Example Snippet",
            'language' => 'python',
            'code' => "print('Hello, world!')",
        ];
    }
}
