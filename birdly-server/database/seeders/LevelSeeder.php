<?php

namespace Database\Seeders;

use App\Models\Level;
use Illuminate\Database\Seeder;

class LevelSeeder extends Seeder {
    public function run(): void {

        Level::Factory()->count(3)->create();
    }
}
