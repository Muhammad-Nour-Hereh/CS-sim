<?php

namespace Tests\Feature\Auth;

use App\Models\User;
use App\Traits\ResponseTrait;
use Illuminate\Foundation\Testing\RefreshDatabase;
use PHPOpenSourceSaver\JWTAuth\Facades\JWTAuth;
use Tests\TestCase;

class AuthTest extends TestCase
{
    use RefreshDatabase, ResponseTrait;

    // ========== me() Tests ==========

    public function testMeSuccess()
    {
        $user = User::factory()->create();
        $token = JWTAuth::fromUser($user);

        $data = [
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'created_at' => $user->created_at->toJSON(),
            'updated_at' => $user->updated_at->toJSON(),
            'deleted_at' => null
        ];

        $expected = $this->successResponse($data);

        $actual = $this->withHeaders([
            "Authorization" => "Bearer $token"
        ])->getJson("/api/v0.1/auth/me");

        $this->assertEqualsResponse($actual, $expected);
    }

    public function testMeFailedUnauthenticated()
    {
        $user = User::factory()->create();
        $token = "wrong token";
        $expected = $this->unauthenticated();

        $actual = $this->withHeaders([
            "Authorization" => "Bearer $token"
        ])->getJson("/api/v0.1/auth/me");

        $this->assertEqualsResponse($actual, $expected);
    }

    // ========== register() Tests ==========

    public function testRegisterSuccess()
    {
        // Test successful user registration
    }

    public function testRegisterFailedValidation()
    {
        // Test registration fails with invalid data
    }

    public function testRegisterFailedDuplicateEmail()
    {
        // Test registration fails with duplicate email
    }

    // ========== login() Tests ==========

    public function testLoginSuccess()
    {
        // Test successful login with valid credentials
    }

    public function testLoginFailedWrongCredentials()
    {
        // Test login fails with wrong password
    }

    public function testLoginFailedUserNotFound()
    {
        // Test login fails with non-existent email
    }

    // ========== logout() Tests ==========

    public function testLogoutSuccess()
    {
        // Test successful logout
    }

    public function testLogoutFailedUnauthenticated()
    {
        // Test logout fails when not authenticated
    }
}
