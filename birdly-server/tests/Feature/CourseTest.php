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

    protected $user;
    protected $token;

    protected function setUp(): void {
        parent::setUp();

        $this->user = User::factory()->create();
        $this->token = JWTAuth::fromUser($this->user);
    }

    public function testIndexCourses() {
        //
    }

    public function testStoreCourse() {
        //
    }

    public function testShowCourse() {
        //
    }

    public function testUpdateCourse() {
        //
    }

    public function testDeleteCourse() {
        //
    }

    public function testShowCourseNotFound() {
        //
    }

    public function testUpdateCourseNotFound() {
        //
    }

    public function testDeleteCourseNotFound() {
        //
    }

    public function testStoreCourseValidationFails() {
        //
    }

    public function testUpdateCourseValidationFails() {
        //
    }
}
