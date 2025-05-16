<?php

namespace Database\Seeders;

use App\Models\Cheat;
use Illuminate\Database\Seeder;



class CheatSeeder extends Seeder {

    public function run(): void {
        Cheat::factory()->create();
    }
}
