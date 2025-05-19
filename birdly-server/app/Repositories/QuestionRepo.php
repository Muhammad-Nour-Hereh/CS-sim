<?php

namespace App\Repositories;

use App\Models\Question;

class QuestionRepo {

    public function all() {
        return Question::all();
    }
}
