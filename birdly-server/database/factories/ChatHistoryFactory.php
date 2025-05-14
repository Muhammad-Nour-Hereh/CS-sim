<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;


class SnippetFactory extends Factory {

    public function definition(): array {
        
        return [
            'history' => json_encode([]),
        ];
    }
}