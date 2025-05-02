<?php

namespace Tests\Feature\Snippet;

use App\Models\User;
use App\Models\Snippet;
use App\Traits\ResponseTrait;
use Illuminate\Foundation\Testing\RefreshDatabase;
use PHPOpenSourceSaver\JWTAuth\Facades\JWTAuth;
use Tests\TestCase;

class SnippetTest extends TestCase {
    use RefreshDatabase, ResponseTrait;

    protected $user;
    protected $token;

    protected function setUp(): void {
        parent::setUp();

        $this->user = User::factory()->create();
        $this->token = JWTAuth::fromUser($this->user);

        Snippet::factory()->create([
            'user_id' => $this->user->id
        ]);
    }

    // ========== index() Tests ==========

    public function testIndexSuccess() {

        $snippets = $this->user->snippets;
        $expected = $this->successResponse($snippets->toArray());

        $actual = $this->withHeaders([
            "Authorization" => "Bearer $this->token"
        ])->getJson("/api/v1/snippets");

        $this->assertEqualsResponse($actual, $expected);
    }

    public function testIndexFailedUnauthenticated() {
        $expected = $this->unauthorizedResponse();
        $token = "invalid token";
        $actual = $this->withHeaders([
            "Authorization" => "Bearer $token"
        ])->getJson("/api/v1/snippets");

        $this->assertEqualsResponse($actual, $expected);
    }

    // ========== store() Tests ==========

    public function testStoreSuccess() {
        $payload = [
            'title' => 'My Python Snippet',
            'language' => 'python',
            'code' => "print('Hello, world!')"
        ];

        $expected = $this->createdResponse();

        $actual = $this->withHeaders([
            "Authorization" => "Bearer $this->token"
        ])->postJson("/api/v1/snippets", $payload);

        $this->assertEqualsResponse($actual, $expected);
    }

    public function testStoreFailedValidation() {
        $payload = [
            'title' => '',
            'language' => 'foo', // invalid language
            'code' => ''
        ];
        $message =       [
            "code" => [
                "The code field is required."
            ],
            "language" => [
                "The selected language is invalid."
            ],
            "title" => [
                "The title field is required."
            ]
        ];

        $expected = $this->unprocessableContentResponse($message);

        $actual = $this->withHeaders([
            "Authorization" => "Bearer $this->token"
        ])->postJson("/api/v1/snippets", $payload);

        $this->assertEqualsResponse($actual, $expected);
    }

    // ========== show() Tests ==========

    public function testShowSuccess() {
        $snippet = $this->user->snippets()->first();

        $expected = $this->successResponse($snippet);

        $actual = $this->withHeaders([
            "Authorization" => "Bearer $this->token"
        ])->getJson("/api/v1/snippets/{$snippet->id}");

        $this->assertEqualsResponse($actual, $expected);
    }

    public function testShowFailedNotFound() {
        $expected = $this->failResponse('Snippet not found', 404);

        $actual = $this->withHeaders([
            "Authorization" => "Bearer $this->token"
        ])->getJson("/api/v1/snippets/999");

        $this->assertEqualsResponse($actual, $expected);
    }

    // ========== update() Tests ==========

    public function testUpdateSuccess() {
        $snippet = $this->user->snippets()->first();

        $payload = [
            'title' => 'Updated Title',
            'language' => 'python',
            'code' => "print('Updated')"
        ];

        $expected = $this->noContentResponse();

        $actual = $this->withHeaders([
            "Authorization" => "Bearer $this->token"
        ])->putJson("/api/v1/snippets/{$snippet->id}", $payload);

        $this->assertEqualsResponse($actual, $expected);
    }

    public function testUpdateFailedNotFound() {
        $payload = [
            'title' => 'Updated Title',
            'language' => 'python',
            'code' => "print('Updated')"
        ];

        $expected = $this->failResponse('Snippet not found', 404);

        $actual = $this->withHeaders([
            "Authorization" => "Bearer $this->token"
        ])->putJson("/api/v1/snippets/999", $payload);

        $this->assertEqualsResponse($actual, $expected);
    }

    // ========== destroy() Tests ==========

    public function testDestroySuccess() {
        $snippet = $this->user->snippets()->first();

        $expected = $this->noContentResponse();

        $actual = $this->withHeaders([
            "Authorization" => "Bearer $this->token"
        ])->deleteJson("/api/v1/snippets/{$snippet->id}");

        $this->assertEqualsResponse($actual, $expected);
    }

    public function testDestroyFailedNotFound() {
        $expected = $this->failResponse('Snippet not found', 404);

        $actual = $this->withHeaders([
            "Authorization" => "Bearer $this->token"
        ])->deleteJson("/api/v1/snippets/999");

        $this->assertEqualsResponse($actual, $expected);
    }
}
