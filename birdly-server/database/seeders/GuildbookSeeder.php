<?php

namespace Database\Seeders;

use App\Models\Course;
use App\Models\Guildbook;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class GuildbookSeeder extends Seeder {

    public function run(): void {

        $course = Course::findOrFail(1);
        $directory = Str::slug($course->title) . '/guildbooks';
        $path = $directory . '/test.mdx';

        Guildbook::factory()->create([
            "course_id" => $course->id,
            "title" => "Intro to Loops",
            "path" => $path
        ]);
    }
}
