<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        User::factory()->create([
            'role_id' => 1,
            'email' => 'admin@example.com',
            'name' => 'System Admin'
        ]);
        User::factory(3)->create([
            'role_id' => 2
        ]);
        User::factory(6)->create();
    }
}
