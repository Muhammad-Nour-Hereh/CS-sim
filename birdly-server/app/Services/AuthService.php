<?php

namespace App\Services;

use PHPOpenSourceSaver\JWTAuth\Facades\JWTAuth;

class AuthService {
    public function user() {
        return JWTAuth::user();
    }
}
