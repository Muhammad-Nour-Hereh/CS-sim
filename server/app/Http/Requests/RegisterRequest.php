<?php

namespace App\Http\Requests;

class RegisterRequest extends BaseFormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users',
            'password' => 'required|string|min:6',
        ];
    }
    public function messages(): array
    {
        return [
            'email.unique' => 'this email already used!',
            'password.min' => 'Your password must be at least 6 characters long for security.',
        ];
    }
}
