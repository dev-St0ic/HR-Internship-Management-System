<?php

namespace Database\Seeders;

use App\Models\Permission;
use App\Models\Role;
use Illuminate\Database\Seeder;

class PermissionSeeder extends Seeder
{
    public function run(): void
    {

        $permissions = [
            'manage_users' => 'Can create, edit, and delete users',
            'view_all_dtr' => 'Can view all Daily Time Records',
            'approve_applications' => 'Can approve intern applications',
            'submit_tasks' => 'Can submit assigned tasks',
            'generate_reports' => 'Can generate HR reports',
        ];

        foreach ($permissions as $name => $description) {
            Permission::firstOrCreate(
                ['name' => $name],
                ['description' => $description]
            );
        }
        $adminRole = Role::where('name', 'HR Admin')->first();
        $staffRole = Role::where('name', 'HR Staff')->first();
        $internRole = Role::where('name', 'Intern')->first();

        $adminRole->permissions()->sync(Permission::all());

        $staffRole->permissions()->sync(
            Permission::whereIn('name', ['view_all_dtr', 'approve_applications'])->get()
        );

        $internRole->permissions()->sync(
            Permission::where('name', 'submit_tasks')->get()
        );
    }
}
