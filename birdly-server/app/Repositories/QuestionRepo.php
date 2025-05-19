<?php

namespace App\Repositories;

use App\Models\Question;

class QuestionRepo {

    public function all() {
        return Question::all();
    }

    public function create(array $data) {
        return Question::create($data);
    }

    public function find($id) {
        return Question::find($id);
    }

}
