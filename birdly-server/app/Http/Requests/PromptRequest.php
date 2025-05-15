<?php

namespace App\Http\Requests;

class PromptRequest extends BaseFormRequest {

    public function authorize(): bool {
        return false;
    }

    public function rules(): array {
        return [
            'prompt' => 'required|string|max:255',
        ];
    }
}
