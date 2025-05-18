<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Models\User;
use App\Services\AuthService;
use PHPOpenSourceSaver\JWTAuth\Facades\JWTAuth;


class AuthController extends Controller {

    public function __construct(protected AuthService $auth) {
    }

    public function me() {
        $user = $this->auth->user();
        return $this->successResponse($user);
    }

    public function register(RegisterRequest $request) {
        $user = User::create($request->validated());

        $token = JWTAuth::fromUser($user);

        return $this->successResponse($token, 201);
    }

    public function login(LoginRequest $request) {
        $credentials = $request->validated();

        if (!$token = JWTAuth::attempt($credentials)) {
            return $this->unauthorizedResponse();
        }

        return $this->successResponse($token);
    }
    public function logout() {
        $token = JWTAuth::getToken();
        JWTAuth::invalidate($token);

        return $this->noContentResponse();
    }
}
