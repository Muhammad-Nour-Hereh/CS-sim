<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder {
    /**
     * Run the database seeds.
     */
    public function run(): void {


        User::factory()->create([
            'name' => 'admin',
            'email' => 'admin@admin.com',
            'password' => '121212',
            'user_type' => 'admin',
        ]);
        User::factory(9)->create();
    }
}
