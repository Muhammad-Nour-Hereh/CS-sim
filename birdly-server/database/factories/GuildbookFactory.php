<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class guildbookFactory extends Factory {

    public function definition(): array {
        return [
            'course_id' => 1,
            'title' => $this->faker->sentence(4),
            'path' => 'intro-to-js/' . $this->faker->slug() . '.mdx',
        ];
    }
}
