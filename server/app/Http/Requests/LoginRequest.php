<?php

namespace App\Http\Requests;

class LoginRequest extends BaseFormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'email' => 'required|email',
            'password' => 'required|string|min:6',
        ];
    }
    public function messages(): array
    {
        return [
            'password.min' => 'Your password must be at least 6 characters long for security.',
        ];
    }
    public function attributes(): array
    {
        return [
            'email' => 'email address',
        ];
    }
}
