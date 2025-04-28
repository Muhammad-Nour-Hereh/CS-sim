<?php

namespace Database\Seeders;

use App\Models\Snippet;
use Illuminate\Database\Seeder;

class SnippetSeeder extends Seeder {
    public function run(): void {

        Snippet::create([
            'user_id' => 1,
            'title' => "Example Snippet",
            'language' => 'python',
            'code' => "print('Hello, world!')",
        ]);
    }
}
