<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class ReleaseSeeder extends Seeder {
    /**
     * Run the database seeds.
     */
    public function run(): void {

        User::create([
            'name' => 'admin',
            'email' => 'admin@admin.com',
            'password' => '121212',
            'user_type' => 'admin',
        ]);
    }
}
