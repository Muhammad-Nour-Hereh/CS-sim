<?php

namespace App\Traits;

trait ResponseTrait {
    public function successResponse($data, $code = 200) {
        return response()->json([
            "success" => true,
            "data" => $data
        ], $code);
    }

    public function noContentResponse() {
        return response()->json([], 204);
    }

    public function failResponse($error, $code = 400) {
        return response()->json([
            "success" => false,
            "message" => $error,
            "data" => null
        ], $code);
    }

    public function unauthorizedResponse() {
        return response()->json([
            "success" => false,
            "message" => "Unauthorized",
            "data" => null
        ], 401);
    }

    public function forbiddenResponse() {
        return response()->json([
            "success" => false,
            "message" => "Forbidden",
            "data" => null
        ], 403);
    }
}
