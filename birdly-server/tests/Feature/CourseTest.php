<?php

namespace Tests\Feature;

use App\Models\Course;
use App\Models\User;
use App\Traits\ResponseTrait;
use Illuminate\Foundation\Testing\RefreshDatabase;
use PHPOpenSourceSaver\JWTAuth\Facades\JWTAuth;
use Tests\TestCase;

class CourseTest extends TestCase {
    use RefreshDatabase, ResponseTrait;

    protected $adminToken;
    protected $userToken;

    protected function setUp(): void {
        parent::setUp();

        $admin = User::factory()->create([
            'user_type' => 'admin'
        ]);

        $user = User::factory()->create([
            'user_type' => 'user'
        ]);

        $this->adminToken = JWTAuth::fromUser($admin);
        $this->userToken = JWTAuth::fromUser($user);
        
        Course::factory()->count(3)->create();
    }

    // index

    public function testIndexCourses() {
        

        $expected = $this->successResponse(Course::all());

        $actual = $this->withHeaders([
            "Authorization" => "Bearer $this->adminToken"
        ])->getJson("/api/v1/courses");

        $this->assertEqualsResponse($actual, $expected);
    }

    // store

    public function testStoreCourse() {
        $payload = ['title' => 'New Course'];

        $actual = $this->withHeaders([
            "Authorization" => "Bearer $this->adminToken"
        ])->postJson("/api/v1/courses", $payload);

        $actual->assertStatus(201);
        $this->assertDatabaseHas('courses', ['title' => 'New Course']);
    }

    public function testStoreCourseValidationFails() {
        $payload = ['title' => '']; // invalid

        $expected = $this->unprocessableContentResponse(["title" => [
            "The title field is required."
        ]]);

        $actual = $this->withHeaders([
            "Authorization" => "Bearer $this->adminToken"
        ])->postJson("/api/v1/courses", $payload);

        $this->assertEqualsResponse($actual, $expected, ignoreFields: ['data']);
    }

    // get

    public function testShowCourse() {
        $course = Course::first();

        $expected = $this->successResponse($course);

        $actual = $this->withHeaders([
            "Authorization" => "Bearer $this->adminToken"
        ])->getJson("/api/v1/courses/{$course->id}");

        $this->assertEqualsResponse($actual, $expected);
    }

    public function testShowCourseNotFound() {
        $expected = $this->notfountResponse();

        $actual = $this->withHeaders([
            "Authorization" => "Bearer $this->adminToken"
        ])->getJson("/api/v1/courses/999");

        $this->assertEqualsResponse($actual, $expected);
    }

    // update

    public function testUpdateCourse() {
        $course = Course::factory()->create();
        $payload = ['title' => 'Updated Title'];

        $actual = $this->withHeaders([
            "Authorization" => "Bearer $this->adminToken"
        ])->putJson("/api/v1/courses/{$course->id}", $payload);

        $actual->assertStatus(200);
        $this->assertDatabaseHas('courses', ['id' => $course->id, 'title' => 'Updated Title']);
    }

    public function testUpdateCourseNotFound() {
        $payload = ['title' => 'Updated'];

        $expected = $this->notfountResponse();

        $actual = $this->withHeaders([
            "Authorization" => "Bearer $this->adminToken"
        ])->putJson("/api/v1/courses/999", $payload);

        $this->assertEqualsResponse($actual, $expected);
    }

    public function testUpdateCourseValidationFails() {
        $course = Course::factory()->create();
        $payload = ['title' => ''];

        $expected = $this->unprocessableContentResponse([
            'title' => ['The title field is required.']
        ]);

        $actual = $this->withHeaders([
            "Authorization" => "Bearer $this->adminToken"
        ])->putJson("/api/v1/courses/{$course->id}", $payload);

        $this->assertEqualsResponse($actual, $expected, ignoreFields: ['data']);
    }

    // delete

    public function testDeleteCourse() {
        $course = Course::factory()->create();

        $actual = $this->withHeaders([
            "Authorization" => "Bearer $this->adminToken"
        ])->deleteJson("/api/v1/courses/{$course->id}");

        $actual->assertStatus(204);
        $this->assertSoftDeleted('courses', ['id' => $course->id]);
    }

    public function testDeleteCourseNotFound() {
        $expected = $this->notfountResponse();

        $actual = $this->withHeaders([
            "Authorization" => "Bearer $this->adminToken"
        ])->deleteJson("/api/v1/courses/999");

        $this->assertEqualsResponse($actual, $expected);
    }

    public function testDeleteCourseForbidden() {
        $course = Course::factory()->create();

        $res = $this->withHeaders([
            "Authorization" => "Bearer $this->userToken"
        ])->deleteJson("/api/v1/courses/{$course->id}");

        $expected = $this->forbiddenResponse();

        $this->assertEqualsResponse($res, $expected);
    }
}
