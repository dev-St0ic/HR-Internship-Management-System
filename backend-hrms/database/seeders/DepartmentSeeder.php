<?php

namespace Database\Seeders;

use App\Models\Department;
use Illuminate\Database\Seeder;

class DepartmentSeeder extends Seeder
{

    public function run(): void
    {
        $managerIds = \App\Models\User::where('role_id', 2)->pluck('id');

        Department::create([
            'department_name' => 'IT Department',
            'description'     => 'Handles technical infrastructure',
            'manager_id'      => $managerIds->random(),
            'is_active'       => true,
        ]);
    }
}
