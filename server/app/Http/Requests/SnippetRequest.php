<?php

namespace App\Http\Requests;

use Illuminate\Validation\Rule;

class SnippetRequest extends BaseFormRequest {
    public function authorize(): bool {
        return true;
    }

    public function rules(): array {
        return [
            'title' => 'required|string|max:255',
            'language' => [
                'required',
                'string',
                Rule::in(['python']),
            ],
            'code' => 'required|string',
        ];
    }
}
