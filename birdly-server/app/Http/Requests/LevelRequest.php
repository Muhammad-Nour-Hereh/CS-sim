<?php

namespace App\Http\Requests;

class LevelRequest extends BaseFormRequest {

    public function authorize(): bool {
        return true;
    }

    public function rules(): array {
        return [
            'title' => 'required|string|max:255',
            'course_id' => 'required|exists:courses,id',
        ];
    }
}
