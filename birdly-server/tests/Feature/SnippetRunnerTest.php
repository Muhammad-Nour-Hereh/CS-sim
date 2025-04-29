<?php

namespace Tests\Feature;

use App\Models\Snippet;
use App\Models\User;
use App\Traits\ResponseTrait;
use Illuminate\Foundation\Testing\RefreshDatabase;
use PHPOpenSourceSaver\JWTAuth\Facades\JWTAuth;
use Tests\TestCase;

class SnippetRunnerTest extends TestCase {
    use RefreshDatabase, ResponseTrait;

    protected $user;
    protected $token;
    protected $snippet;

    protected function setUp(): void {
        parent::setUp();

        $this->user = User::factory()->create();
        $this->token = JWTAuth::fromUser($this->user);

        $this->snippet = Snippet::factory()->create([
            'user_id' => $this->user->id
        ]);
    }


    public function testRunPythonSnippetSuccess() {
        $expectedOutput = "Hello, world!\n";

        $expected = $this->successResponse([
            'status' => "success",
            'output' => $expectedOutput
        ]);

        $actual = $this->withHeaders([
            "Authorization" => "Bearer $this->token"
        ])->postJson("/api/v1/snippets/run/{$this->snippet->id}");

        $this->assertEqualsResponse($actual, $expected);
    }

    public function testRunSnippetNotFound() {
        $nonExistingId = 999;

        $expected = $this->failResponse("Snippet not found", 404);

        $actual = $this->withHeaders([
            "Authorization" => "Bearer $this->token"
        ])->postJson("/api/v1/snippets/run/{$nonExistingId}");

        $this->assertEqualsResponse($actual, $expected);
    }

    public function testRunBuggedPythonSnippet() {
        $buggedSnippet = Snippet::factory()->create([
            'user_id' => $this->user->id,
            'code' => "print 'Hello, world!'",
        ]);

        $expectedOutput = "SyntaxError";

        $expected = $this->successResponse([
            'status' => "SyntaxError",
            'output' => $expectedOutput
        ]);

        $actual = $this->withHeaders([
            "Authorization" => "Bearer $this->token"
        ])->postJson("/api/v1/snippets/run/{$buggedSnippet->id}");

        $this->assertEqualsResponse($actual, $expected, ignoreFields: ['data/output']);
    }
}
