<?php

namespace Database\Seeders;

use App\Models\Question;
use Illuminate\Database\Seeder;

class QuestionSeeder extends Seeder {
    private $questions = [
        // Select Question
        [
            'title' => 'Which of the following is a valid Python variable name?',
            'content' => [
                'options' => ['2myVar', '_myVar', 'my-var', 'class'],
                'correctAnswer' => '_myVar',
            ],
            'type' => 'select',
        ],
    
        // Write Question
        [
            'title' => 'What Python keyword is used to delete a variable?',
            'content' => [
                'correctAnswer' => 'del',
            ],
            'type' => 'write',
        ],
    
        // Order Question
        [
            'title' => 'Arrange these steps in the correct order to swap two variables in Python without using a temporary variable.',
            'content' => [
                'correctOrder' => ['x = 10, y = 20', 'x = x + y', 'y = x - y', 'x = x - y'],
                'pieces' => ['y = x - y', 'x = 10, y = 20', 'x = x - y', 'x = x + y'],
            ],
            'type' => 'order',
        ],
    
        // Match Question
        [
            'title' => 'Match each Python variable type with its corresponding example.',
            'content' => [
                'pairs' => [
                    ['left' => 'int', 'right' => '42', 'selected' => false],
                    ['left' => 'float', 'right' => '3.14', 'selected' => false],
                    ['left' => 'str', 'right' => "'hello'", 'selected' => false],
                    ['left' => 'list', 'right' => '[1, 2, 3]', 'selected' => false],
                    ['left' => 'dict', 'right' => "{'key': 'value'}", 'selected' => false],
                ],
            ],
            'type' => 'match',
        ],
    ];

    public function run(): void {

        foreach ($this->questions as $question) {
            $questionsObject = Question::factory()->create([
                'title' => $question['title'],
                'content' => json_encode($question['content']),
                'type' => $question['type'],
            ]);
            $questionsObject->levels()->attach(1);
        }

        $this->createAndattach(2);
        $this->createAndattach(3);
    }

    public function createAndattach($levelId) {
        $questions = Question::factory()->count(10)->create();

        foreach ($questions as $question) {
            $question->levels()->attach($levelId);
        }
    }
}
