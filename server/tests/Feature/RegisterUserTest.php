<?php

namespace Tests\Feature;

use App\Models\User;
use App\Traits\ResponseTrait;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class RegisterUserTest extends TestCase {
    use RefreshDatabase, ResponseTrait;

    protected $user;

    protected function setUp(): void {
        parent::setUp();

        $this->user = User::factory()->make()->toArray();
        $this->user['password'] = 'password';
    }

    public function testRegisterSuccess() {

        $actual = $this->postJson("/api/v1/auth/register", $this->user);

        $data = json_decode($actual->getContent(), true);
        $token = $data["data"];

        $expected = $this->successResponse($token, 201);

        $this->assertEqualsResponse($actual, $expected);
    }

    public function testRegisterFailedValidation() {
        $message = [
            "email" => [
                "The email field is required."
            ],
            "name" => [
                "The name field is required."
            ],
            "password" => [
                "The password field is required."
            ]
        ];

        $expected = $this->failResponse($message, 422);

        $actual = $this->postJson("/api/v1/auth/register", []);

        $this->assertEqualsResponse($actual, $expected);
    }

    public function testRegisterFailedDuplicateEmail() {
        $message = [
            "email" => ["this email already used!"]
        ];

        $expected = $this->failResponse($message, 409);

        $actual = $this->postJson("/api/v1/auth/register", $this->user);
        $actual = $this->postJson("/api/v1/auth/register", $this->user);

        $this->assertEqualsResponse($actual, $expected);
    }
}
