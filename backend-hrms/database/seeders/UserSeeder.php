<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        User::query()->delete();

        // Admin
        User::factory()->create([
            'role_id' => 1,
            'email' => 'admin@example.com',
            'first_name' => 'System',
            'last_name' => 'Admin',
            'status' => 'active',
        ]);
        
        // HR Staff
        User::factory()->create([
            'role_id' => 2,
            'email' => 'staff@example.com',
            'first_name' => 'John',
            'last_name' => 'Staff',
            'status' => 'active',
        ]);
        
        // Supervisor
        User::factory()->create([
            'role_id' => 3,
            'email' => 'supervisor@example.com',
            'first_name' => 'Jane',
            'last_name' => 'Supervisor',
            'status' => 'active',
        ]);
        
        // Interns (exactly 3 for seed baseline)
        User::factory()->create([
            'role_id' => 4,
            'email' => 'intern1@example.com',
            'first_name' => 'Mike',
            'last_name' => 'Intern',
            'status' => 'active',
        ]);

        User::factory()->create([
            'role_id' => 4,
            'email' => 'intern2@example.com',
            'first_name' => 'Ana',
            'last_name' => 'Intern',
            'status' => 'active',
        ]);

        User::factory()->create([
            'role_id' => 4,
            'email' => 'intern3@example.com',
            'first_name' => 'Leo',
            'last_name' => 'Intern',
            'status' => 'active',
        ]);
    }
}
