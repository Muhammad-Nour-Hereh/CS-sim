<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder {

    public function run(): void {
        $this->call([
            CourseSeeder::class,
            GuildbookSeeder::class,
            UserSeeder::class,
            SnippetSeeder::class
        ]);
    }
}
