<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use PHPOpenSourceSaver\JWTAuth\Facades\JWTAuth;

class AuthController extends Controller {
    public function me() {
        $user = JWTAuth::user();
        return $this->successResponse($user);
    }
    public function register() {
    }
    public function login() {
    }
    public function logout() {
    }
}
