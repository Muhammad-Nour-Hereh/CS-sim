<?php

namespace Database\Seeders;

use App\Models\Course;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CourseSeeder extends Seeder {

    public function run(): void {
        Course::factory()->create(
            [
                'title' => 'Intro to Birdly'
            ]
        );
    }
}
