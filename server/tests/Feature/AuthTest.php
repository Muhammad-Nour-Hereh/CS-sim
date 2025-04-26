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
        $expected = $this->unauthenticated();

        $actual = $this->withHeaders([
            "Authorization" => "Bearer $token"
        ])->getJson("/api/v1/auth/me");

        $this->assertEqualsResponse($actual, $expected);
    }

    // ========== register() Tests ==========

    public function testRegisterSuccess() {

        $expected = $this->successResponse($this->data);

        $actual = $this->withHeaders([
            "Authorization" => "Bearer $this->token"
        ])->getJson("/api/v1/auth/register");

        $this->assertEqualsResponse($actual, $expected);
    }

    public function testRegisterFailedValidation() {
        // Test registration fails with invalid data
    }

    public function testRegisterFailedDuplicateEmail() {
        // Test registration fails with duplicate email
    }

    // ========== login() Tests ==========

    public function testLoginSuccess() {
        // Test successful login with valid credentials
    }

    public function testLoginFailedWrongCredentials() {
        // Test login fails with wrong password
    }

    public function testLoginFailedUserNotFound() {
        // Test login fails with non-existent email
    }

    // ========== logout() Tests ==========

    public function testLogoutSuccess() {
        // Test successful logout
    }

    public function testLogoutFailedUnauthenticated() {
        // Test logout fails when not authenticated
    }
}
