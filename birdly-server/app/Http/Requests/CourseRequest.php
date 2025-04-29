<?php

namespace App\Http\Requests;

class CourseRequest extends BaseFormRequest {

    public function authorize(): bool {
        return true;
    }

    public function rules(): array {
        return [
            'title' => 'required|string|max:255',
        ];
    }
}
