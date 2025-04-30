<?php

namespace Database\Seeders;

use App\Models\Cheat;
use Illuminate\Database\Seeder;

class CheatSeeder extends Seeder {

    public function run(): void {
        $topics = [
            'Variables' => 'Variables store data like numbers and text.',
            'Loops' => 'Loops repeat actions until a condition is met.',
            'Functions' => 'Functions are reusable blocks of code.',
        ];

        // foreach ($topics as $title => $content) {
        //     Cheat::factory()->create([
        //         'title' => $title,
        //         'content' => "# {$title}\n\n{$content}",
        //     ]);
        // }

        Cheat::factory()->count(3)->create();
    }
}
