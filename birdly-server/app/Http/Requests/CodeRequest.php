<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CodeRequest extends BaseFormRequest {

    public function authorize(): bool {
        return true;
    }

    public function rules(): array {
        return ['code' => 'required|string'];
    }
}
