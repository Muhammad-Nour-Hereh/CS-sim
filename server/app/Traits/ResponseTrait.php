<?php

namespace App\Traits;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

trait ResponseTrait {
    public function successResponse($data, $code = 200) {
        return response()->json([
            "success" => true,
            "payload" => $data
        ], $code);
    }

    public function failResponse($error, $code = 400) {
        return response()->json([
            "success" => false,
            "error" => $error
        ], $code);
    }

    public function unauthenticated() {
        return response()->json([
            "success" => false,
            "message" => "Unauthenticated"
        ], 401);
    }

    public function unautherized() {
        return response()->json([
            "success" => false,
            "message" => "forbiddin"
        ], 403);
    }

    public function failedValidation(Validator $validator) {
        throw new HttpResponseException(response()->json([
            "result" => $validator->errors(),
            "success" => false
        ]));
    }
}
