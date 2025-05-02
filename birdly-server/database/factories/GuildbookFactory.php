<?php

namespace Database\Factories;


use App\Services\GuildbookFileService;
use Illuminate\Database\Eloquent\Factories\Factory;

class guildbookFactory extends Factory {

    public function definition(): array {
        $title = $this->faker->sentence(3);
        $content = "# {$title}\n\n" . $this->faker->paragraphs(3, true);

        $fileService = app(GuildbookFileService::class);
        $path = $fileService->store(1, $title, $content);

        return [
            'title' => $title,
            'course_id' => 1,
            'path' => $path,
        ];
    }
}
