<?php

namespace Tests\Feature\Middleware;

use App\Models\User;
use App\Traits\ResponseTrait;
use Illuminate\Foundation\Testing\RefreshDatabase;
use PHPOpenSourceSaver\JWTAuth\Facades\JWTAuth;
use Tests\TestCase;

class AdminTest extends TestCase {
    use RefreshDatabase, ResponseTrait;

    protected $admin;
    protected $user;
    protected $adminToken;
    protected $userToken;

    protected function setUp(): void {
        parent::setUp();

        $this->admin = User::factory()->create(['user_type' => 'admin']);
        $this->user = User::factory()->create(['user_type' => 'user']);

        $this->adminToken = JWTAuth::fromUser($this->admin);
        $this->userToken = JWTAuth::fromUser($this->user);

        // Register test route protected by admin middleware
        app('router')->get('/admin-only', function () {
            return response()->json(['success' => 'true', 'data' => 'You are admin']);
        })->middleware(['jwt', 'admin']);
    }

    public function testAdminCanAccessRoute() {
        $expected = $this->successResponse(data: 'You are admin');

        $actual = $this->withHeaders([
            'Authorization' => "Bearer $this->adminToken"
        ])->getJson('/admin-only');

        $this->assertEqualsResponse($actual, $expected);
    }

    public function testuserIsForbidden() {
        $expected = $this->forbiddenResponse();

        $actual = $this->withHeaders([
            'Authorization' => "Bearer $this->userToken"
        ])->getJson('/admin-only');

        $this->assertEqualsResponse($actual, $expected);
    }

    public function testUnauthenticatedUserIsUnauthorized() {
        $expected = $this->unauthorizedResponse();

        $actual = $this->getJson('/admin-only');

        $this->assertEqualsResponse($actual, $expected);
    }
}
