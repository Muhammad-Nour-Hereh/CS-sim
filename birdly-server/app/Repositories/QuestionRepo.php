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

    public function update($id, array $data) {
        $question = Question::find($id);
        if (!$question) return null;
        $question->update($data);
        return $question;
    }

    public function delete($id) {
        $question = Question::find($id);
        if (!$question) return false;
        return $question->delete();
    }
}
