<?php

namespace Tests\Feature;

use App\Models\User;
use App\Traits\ResponseTrait;
use Illuminate\Foundation\Testing\RefreshDatabase;
use PHPOpenSourceSaver\JWTAuth\Facades\JWTAuth;
use Tests\TestCase;

class RegisterUserTest extends TestCase {
    use RefreshDatabase, ResponseTrait;

    protected $user;

    protected function setUp(): void {
        parent::setUp();

        $this->user = User::factory()->make();
    }

    public function testRegisterSuccess() {

        $expected = $this->successResponse($this->user);

        $actual = $this->PostJson("/api/v1/auth/register", $this->user);

        $this->assertEqualsResponse($actual, $expected);
    }

    public function testRegisterFailedValidation() {
        $expected = $this->failResponse("missing", 422);

        $actual = $this->PostJson("/api/v1/auth/register", []);

        $this->assertEqualsResponse($actual, $expected);
    }

    public function testRegisterFailedDuplicateEmail() {

        $expected = $this->failResponse("duplicate entity", 409);

        $actual = $this->PostJson("/api/v1/auth/register", $this->user);
        $actual = $this->PostJson("/api/v1/auth/register", $this->user);

        $this->assertEqualsResponse($actual, $expected);
    }
}
