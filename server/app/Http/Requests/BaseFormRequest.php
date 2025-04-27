<?php

namespace App\Http\Requests;

use App\Traits\ResponseTrait;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class BaseFormRequest extends FormRequest {
    use ResponseTrait;

    public function failedValidation(Validator $validator) {
        $errors = $validator->errors()->toArray();

        $specificMessage = [
            "email" => ["this email already used!"]
        ];

        if ($errors === $specificMessage) 
            throw new HttpResponseException(
                $this->conflictResponse($errors)
            );
        

        throw new HttpResponseException(
            $this->unprocessableContentResponse($validator->errors())
        );
    }
}
