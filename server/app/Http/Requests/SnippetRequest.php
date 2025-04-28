<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class SnippetRequest extends FormRequest {
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

    public function messages(): array {
        return [
            'title.required' => 'The snippet must have a title.',
            'language.required' => 'The language field is required.',
            'language.in' => 'Only the Python language is currently supported.',
            'code.required' => 'The snippet must contain some code.',
        ];
    }
}
