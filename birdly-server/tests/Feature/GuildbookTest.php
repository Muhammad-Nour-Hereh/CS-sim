<?php

namespace Tests\Feature;

use App\Models\Course;
use App\Models\Guildbook;
use App\Models\User;
use App\Traits\ResponseTrait;
use Illuminate\Foundation\Testing\RefreshDatabase;
use PHPOpenSourceSaver\JWTAuth\Facades\JWTAuth;
use Tests\TestCase;

class GuildbookTest extends TestCase {
    // use RefreshDatabase, ResponseTrait;

    // protected $adminToken;
    // protected $userToken;

    // protected function setUp(): void {
    //     parent::setUp();

    //     $admin = User::factory()->create([
    //         'user_type' => 'admin'
    //     ]);

    //     $user = User::factory()->create([
    //         'user_type' => 'user'
    //     ]);

    //     $this->adminToken = JWTAuth::fromUser($admin);
    //     $this->userToken = JWTAuth::fromUser($user);
    //     Course::factory()->create();
    //     Guildbook::factory()->count(3)->create();
    // }

    // public function testIndexGuildbooks() {
    //     $expected = $this->successResponse(Guildbook::all());

    //     $actual = $this->withHeaders([
    //         "Authorization" => "Bearer $this->adminToken"
    //     ])->getJson("/api/v1/guildbooks");

    //     $this->assertEqualsResponse($actual, $expected);
    // }

    // public function testStoreGuildbook() {
    //     $payload = ['title' => 'New Guildbook'];

    //     $actual = $this->withHeaders([
    //         "Authorization" => "Bearer $this->adminToken"
    //     ])->postJson("/api/v1/guildbooks", $payload);

    //     $actual->assertStatus(201);
    //     $this->assertDatabaseHas('guildbooks', ['title' => 'New Guildbook']);
    // }

    // public function testStoreGuildbookValidationFails() {
    //     $payload = ['title' => ''];

    //     $expected = $this->unprocessableContentResponse(['title' => ["The title field is required."]]);

    //     $actual = $this->withHeaders([
    //         "Authorization" => "Bearer $this->adminToken"
    //     ])->postJson("/api/v1/guildbooks", $payload);

    //     $this->assertEqualsResponse($actual, $expected, ignoreFields: ['data']);
    // }

    // public function testShowGuildbook() {
    //     $guildbook = Guildbook::first();

    //     $expected = $this->successResponse($guildbook);

    //     $actual = $this->withHeaders([
    //         "Authorization" => "Bearer $this->adminToken"
    //     ])->getJson("/api/v1/guildbooks/{$guildbook->id}");

    //     $this->assertEqualsResponse($actual, $expected);
    // }

    // public function testShowGuildbookNotFound() {
    //     $expected = $this->notfountResponse();

    //     $actual = $this->withHeaders([
    //         "Authorization" => "Bearer $this->adminToken"
    //     ])->getJson("/api/v1/guildbooks/999");

    //     $this->assertEqualsResponse($actual, $expected);
    // }

    // public function testUpdateGuildbook() {
    //     $guildbook = Guildbook::factory()->create();
    //     $payload = ['title' => 'Updated Guildbook'];

    //     $actual = $this->withHeaders([
    //         "Authorization" => "Bearer $this->adminToken"
    //     ])->putJson("/api/v1/guildbooks/{$guildbook->id}", $payload);

    //     $actual->assertStatus(200);
    //     $this->assertDatabaseHas('guildbooks', ['id' => $guildbook->id, 'title' => 'Updated Guildbook']);
    // }

    // public function testUpdateGuildbookNotFound() {
    //     $payload = ['title' => 'Updated'];

    //     $expected = $this->notfountResponse();

    //     $actual = $this->withHeaders([
    //         "Authorization" => "Bearer $this->adminToken"
    //     ])->putJson("/api/v1/guildbooks/999", $payload);

    //     $this->assertEqualsResponse($actual, $expected);
    // }

    // public function testUpdateGuildbookValidationFails() {
    //     $guildbook = Guildbook::factory()->create();
    //     $payload = ['title' => ''];

    //     $expected = $this->unprocessableContentResponse([
    //         'title' => ['The title field is required.']
    //     ]);

    //     $actual = $this->withHeaders([
    //         "Authorization" => "Bearer $this->adminToken"
    //     ])->putJson("/api/v1/guildbooks/{$guildbook->id}", $payload);

    //     $this->assertEqualsResponse($actual, $expected, ignoreFields: ['data']);
    // }

    // public function testDeleteGuildbook() {
    //     $guildbook = Guildbook::factory()->create();

    //     $actual = $this->withHeaders([
    //         "Authorization" => "Bearer $this->adminToken"
    //     ])->deleteJson("/api/v1/guildbooks/{$guildbook->id}");

    //     $actual->assertStatus(204);
    //     $this->assertSoftDeleted('guildbooks', ['id' => $guildbook->id]);
    // }

    // public function testDeleteGuildbookNotFound() {
    //     $expected = $this->notfountResponse();

    //     $actual = $this->withHeaders([
    //         "Authorization" => "Bearer $this->adminToken"
    //     ])->deleteJson("/api/v1/guildbooks/999");

    //     $this->assertEqualsResponse($actual, $expected);
    // }

    // public function testDeleteGuildbookForbidden() {
    //     $guildbook = Guildbook::factory()->create();

    //     $res = $this->withHeaders([
    //         "Authorization" => "Bearer $this->userToken"
    //     ])->deleteJson("/api/v1/guildbooks/{$guildbook->id}");

    //     $expected = $this->forbiddenResponse();

    //     $this->assertEqualsResponse($res, $expected);
    // }
}
