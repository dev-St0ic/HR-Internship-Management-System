<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        // Admin
        User::factory()->create([
            'role_id' => 1,
            'email' => 'admin@example.com',
            'first_name' => 'System',
            'last_name' => 'Admin'
        ]);
        
        // HR Staff
        User::factory()->create([
            'role_id' => 2,
            'email' => 'staff@example.com',
            'first_name' => 'John',
            'last_name' => 'Staff'
        ]);
        
        // Supervisor
        User::factory()->create([
            'role_id' => 3,
            'email' => 'supervisor@example.com',
            'first_name' => 'Jane',
            'last_name' => 'Supervisor'
        ]);
        
        // Interns
        User::factory()->create([
            'role_id' => 4,
            'email' => 'intern@example.com',
            'first_name' => 'Mike',
            'last_name' => 'Intern'
        ]);
        
        User::factory(5)->create([
            'role_id' => 4
        ]);
    }
}
