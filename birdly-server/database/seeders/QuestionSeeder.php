<?php

namespace Database\Seeders;

use App\Models\Question;
use Illuminate\Database\Seeder;

class QuestionSeeder extends Seeder {

    public function run(): void {
        $this->createAndattach(1);
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
