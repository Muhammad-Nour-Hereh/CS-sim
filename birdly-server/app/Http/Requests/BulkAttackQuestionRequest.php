<?php

namespace App\Http\Requests;

class BulkAttackQuestionRequest extends BaseFormRequest {

    public function authorize(): bool {
        return true;
    }

    public function rules(): array {
        return [
            'questions_ids' => 'required|array',
            'questions_ids.*' => 'exists:questions,id'
        ];
    }
}
