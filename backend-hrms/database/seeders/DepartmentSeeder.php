<?php

namespace Database\Seeders;

use App\Models\Department;
use Illuminate\Database\Seeder;

class DepartmentSeeder extends Seeder
{

    public function run(): void
    {
        Department::create([
            'department_name' => 'IT Department',
            'description'     => 'Handles technical infrastructure',
            'is_active'       => true,
        ]);

        Department::create([
            'department_name' => 'Human Resources',
            'description'     => 'Manages personnel and recruitment',
            'is_active'       => true,
        ]);

        Department::create([
            'department_name' => 'Finance',
            'description'     => 'Handles budgets and financial operations',
            'is_active'       => true,
        ]);
    }
}
