<?php

namespace Database\Seeders;

use App\Models\Guildbook;
use Illuminate\Database\Seeder;


class GuildbookSeeder extends Seeder {

    public function run(): void {
        Guildbook::factory()->create();
    }
}
