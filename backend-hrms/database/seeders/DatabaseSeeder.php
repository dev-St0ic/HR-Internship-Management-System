<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Seed roles first
        $this->call([
            RoleSeeder::class,
            PermissionSeeder::class,
            UserSeeder::class,
            DepartmentSeeder::class,
            UniversitySeeder::class,
            EmployeeSeeder::class,
            InternSeeder::class,
            ApplicationSeeder::class,
            AttendanceSeeder::class,
            DtrSubmissionSeeder::class,
            EvaluationSeeder::class,
            NotificationSeeder::class,
            DocumentSeeder::class,
            TaskSeeder::class,
            InternPolicySeeder::class,
            EvaluationCriteriaSeeder::class,
        ]);
    }
}
