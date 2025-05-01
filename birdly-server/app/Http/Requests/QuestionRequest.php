<?php

namespace App\Http\Requests;

class QuestionRequest extends BaseFormRequest {

    public function authorize(): bool {
        return true;
    }

    public function rules(): array {
        return [
            'course_id' => 'required|exists:courses,id',
            'title' => 'required|string|max:255',
            'question_type' => 'required|in:select,match,write,order',
            'content' => 'required|json',
        ];
    }
}
