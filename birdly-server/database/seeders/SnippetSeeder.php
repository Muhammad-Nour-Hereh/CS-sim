<?php

namespace Database\Seeders;

use App\Models\Snippet;
use Illuminate\Database\Seeder;

class SnippetSeeder extends Seeder {
    public function run(): void {

        Snippet::factory()->create();
    }
}
