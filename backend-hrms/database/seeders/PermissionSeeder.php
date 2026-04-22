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
            'view_interns' => 'Can view intern profiles and records',
            'create_interns' => 'Can create intern records/accounts',
            'evaluate_interns' => 'Can evaluate intern performance',
            'manage_universities' => 'Can manage university records',
            'approve_applications' => 'Can approve intern applications',
            'view_all_dtr' => 'Can view all Daily Time Records',
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
        $supervisorRole = Role::where('name', 'Supervisor')->first();
        $internRole = Role::where('name', 'Intern')->first();

        $adminRole->permissions()->sync(Permission::all());

        $staffRole->permissions()->sync(
            Permission::whereIn('name', [
                'view_interns',
                'create_interns',
                'approve_applications',
                'view_all_dtr',
                'generate_reports',
            ])->get()
        );

        $supervisorRole->permissions()->sync(
            Permission::whereIn('name', ['view_interns', 'evaluate_interns'])->get()
        );

        $internRole->permissions()->sync(
            Permission::where('name', 'submit_tasks')->get()
        );
    }
}
