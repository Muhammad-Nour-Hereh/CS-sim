<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class guildbookFactory extends Factory {

    public function definition(): array {
        return [
            'course_id' => 1,
            'slug' => $this->faker->slug(),
            'title' => $this->faker->sentence(4),
            'mdx_path' => 'intro-to-js/' . $this->faker->slug() . '.mdx',
            'order_index' => $this->faker->numberBetween(1, 10),
        ];
    }
}
