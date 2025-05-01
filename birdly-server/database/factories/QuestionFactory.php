<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class QuestionFactory extends Factory {
    public function definition(): array {
        $questionType = $this->faker->randomElement(['select', 'match', 'write', 'order']);
        $question = $this->faker->sentence(6);

        $content = match ($questionType) {
            'select' => $this->selectContent($question),
            'write'  => $this->writeContent($question),
            'match'  => $this->matchContent(),
            'order'  => $this->orderContent(),
        };

        return [
            'course_id' => 1,
            'title' => $question,
            'question_type' => $questionType,
            'content' => json_encode($content),
        ];
    }

    private function selectContent(string $question): array {
        $options = $this->faker->words(4);
        return [
            'question' => $question,
            'options' => $options,
            'answer' => $this->faker->randomElement($options),
        ];
    }

    private function writeContent(string $question): array {
        return [
            'question' => $question,
            'answer' => $this->faker->sentence(3),
        ];
    }

    private function matchContent(): array {
        $pairs = collect(range(1, 4))->map(function () {
            return [
                'left' => $this->faker->word(),
                'right' => $this->faker->word(),
            ];
        })->toArray();

        return [
            'question' => 'Match the following',
            'pairs' => $pairs,
        ];
    }

    private function orderContent(): array {
        $items = $this->faker->shuffle(['Step 1', 'Step 2', 'Step 3', 'Step 4']);
        return [
            'question' => 'Arrange in correct order',
            'items' => $items,
        ];
    }
}
