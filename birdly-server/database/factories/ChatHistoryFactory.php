<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;


class ChatHistoryFactory extends Factory {

    public function definition(): array {
        
        return [
            'history' => json_encode([]),
        ];
    }
}