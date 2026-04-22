<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    public function run(): void
    {
        $roles = [
            ['name' => 'HR Admin', 'description' => 'Full system access'],
            ['name' => 'HR Staff', 'description' => 'Manage employees and interns'],
            ['name' => 'Supervisor', 'description' => 'Oversee interns and tasks'],
            ['name' => 'Intern', 'description' => 'Access to tasks and DTR'],
        ];

        foreach ($roles as $role) {
            \App\Models\Role::create($role);
        }
    }
}
