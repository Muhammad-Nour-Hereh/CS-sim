<?php

namespace Tests\Feature;

use App\Models\Course;
use App\Models\Guildbook;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Storage;
use PHPOpenSourceSaver\JWTAuth\Facades\JWTAuth;
use Tests\TestCase;

class GuildbookTest extends TestCase {
    use RefreshDatabase;

    protected $token;

    protected function setUp(): void {
        parent::setUp();

        $admin = User::factory()->create(['user_type' => 'admin']);
        $this->token = JWTAuth::fromUser($admin);

        Course::factory()->create();
        Storage::fake();
    }

    public function testStoreGuildbook() {

        $payload = [
            'title' => 'New Guildbook',
            'course_id' => 1,
            'content' => 'This is the content'
        ];

        $this->withHeaders([
            'Authorization' => "Bearer $this->token"
        ])->postJson('/api/v1/guildbooks', $payload);

        $this->assertDatabaseHas('guildbooks', ['title' => 'New Guildbook']);

        $guildbook = Guildbook::where('title', 'New Guildbook')->first();
        Storage::assertExists($guildbook->path);
        $this->assertEquals('This is the content', Storage::get($guildbook->path));
    }

    public function testShowGuildbook() {

        $guildbook = Guildbook::factory()->create([
            'path' => 'example/path.mdx'
        ]);

        Storage::put('example/path.mdx', 'Guildbook content');

        $response = $this->withHeaders([
            'Authorization' => "Bearer $this->token"
        ])->getJson("/api/v1/guildbooks/{$guildbook->id}");

        $response->assertOk();
        $response->assertJsonFragment(['content' => 'Guildbook content']);
    }

    public function testUpdateGuildbook() {

        $guildbook = Guildbook::factory()->create([
            'path' => 'example/path.mdx'
        ]);

        Storage::put($guildbook->path, 'Old content');

        $payload = [
            'title' => 'Updated Title',
            'course_id' => $guildbook->course_id,
            'content' => 'Updated content'
        ];

        $this->withHeaders([
            'Authorization' => "Bearer $this->token"
        ])->putJson("/api/v1/guildbooks/{$guildbook->id}", $payload);

        Storage::assertExists($guildbook->path);
        $this->assertEquals('Updated content', Storage::get($guildbook->path));
    }

    public function testDeleteGuildbook() {

        $guildbook = Guildbook::factory()->create([
            'path' => 'example/path.mdx'
        ]);

        Storage::put($guildbook->path, 'Some content');

        $this->withHeaders([
            'Authorization' => "Bearer $this->token"
        ])->deleteJson("/api/v1/guildbooks/{$guildbook->id}");

        Storage::assertMissing($guildbook->path);
        $this->assertSoftDeleted('guildbooks', ['id' => $guildbook->id]);
    }
}
