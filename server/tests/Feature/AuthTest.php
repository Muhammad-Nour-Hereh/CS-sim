<?php

namespace Tests\Feature\Auth;

use App\Models\User;
use App\Traits\ResponseTrait;
use Illuminate\Foundation\Testing\RefreshDatabase;
use PHPOpenSourceSaver\JWTAuth\Facades\JWTAuth;
use Tests\TestCase;

class AuthTest extends TestCase {
    use RefreshDatabase, ResponseTrait;

    protected $user;
    protected $token;
    protected $data;

    protected function setUp(): void {
        parent::setUp();

        $this->user = User::factory()->create();
        $this->token = JWTAuth::fromUser($this->user);
        $this->data = [
            'id' => $this->user->id,
            'name' => $this->user->name,
            'email' => $this->user->email,
            'created_at' => $this->user->created_at->toJSON(),
            'updated_at' => $this->user->updated_at->toJSON(),
            'deleted_at' => null
        ];
    }


    // ========== me() Tests ==========
    public function testMeSuccess() {

        $expected = $this->successResponse($this->data);

        $actual = $this->withHeaders([
            "Authorization" => "Bearer $this->token"
        ])->getJson("/api/v1/auth/me");

        $this->assertEqualsResponse($actual, $expected);
    }

    public function testMeFailedUnauthenticated() {
        $token = "wrong token";
        $expected = $this->unauthorizedResponse();

        $actual = $this->withHeaders([
            "Authorization" => "Bearer $token"
        ])->getJson("/api/v1/auth/me");

        $this->assertEqualsResponse($actual, $expected);
    }

    // ========== login() Tests ==========

    public function testLoginSuccess() {
        $credentials = [
            'email' => $this->user->email,
            'password' => 'password'
        ];
        $expected = $this->successResponse($this->data);
        $actual = $this->PostJson("/api/v1/auth/login", $credentials);

        $this->assertEqualsResponse($actual, $expected);
    }

    public function testLoginFailedWrongCredentials() {
        $credentials = [
            'email' => $this->user->email,
            'password' => 'wrong password'
        ];
        $expected = $this->unauthorizedResponse();
        $actual = $this->PostJson("/api/v1/auth/login", $credentials);

        $this->assertEqualsResponse($actual, $expected);
    }

    public function testLoginFailedUnprocessableContent() {
        $credentials = [
            'email' => $this->user->email,
        ];
        $expected = $this->failResponse($message = 'missing password', 422);
        $actual = $this->PostJson("/api/v1/auth/login", $credentials);

        $this->assertEqualsResponse($actual, $expected);
    }

    // ========== logout() Tests ==========

    public function testLogoutSuccess() {
        $expected = $this->noContentResponse();

        $actual = $this->withHeaders([
            "Authorization" => "Bearer $this->token"
        ])->PostJson("/api/v1/auth/logout");

        $this->assertEqualsResponse($actual, $expected);
    }

    public function testLogoutFailedUnauthenticated() {
        $token = "wrong token";
        $expected = $this->unauthorizedResponse();

        $actual = $this->withHeaders([
            "Authorization" => "Bearer $token"
        ])->PostJson("/api/v1/auth/logout");

        $this->assertEqualsResponse($actual, $expected);
    }
}
