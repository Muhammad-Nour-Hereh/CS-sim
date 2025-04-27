<?php

namespace App\Http\Controllers;

use App\Http\Requests\RegisterRequest;
use App\Models\User;
use PHPOpenSourceSaver\JWTAuth\Facades\JWTAuth;


class AuthController extends Controller {
    public function me() {
        $user = JWTAuth::user();
        return $this->successResponse($user);
    }

    public function register(RegisterRequest $request) {
        $user = User::create($request->validated());

        $token = JWTAuth::fromUser($user);

        return $this->successResponse($token, 201);
    }

    public function login() {
        
    }
    public function logout() {
        $token = JWTAuth::getToken();
        JWTAuth::invalidate($token);

        return $this->noContentResponse();
    }
}
