<?php

namespace App\Services;

use App\Models\User;
use PHPOpenSourceSaver\JWTAuth\Facades\JWTAuth;

class AuthService {
    public function user() {
        return JWTAuth::user();
    }

    public function register($credentials) {
        $user = User::create($credentials);
        $token = JWTAuth::fromUser($user);

        return $token;
    }
}
