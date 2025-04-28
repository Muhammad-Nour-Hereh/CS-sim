<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class userSeeder extends Seeder {
    /**
     * Run the database seeds.
     */
    public function run(): void {
        

        User::factory()->create([
            'name' => 'a',
            'email' => 'a@a.com',
            'password' => '121212'
        ]);
        User::factory(9)->create();
    }
}
