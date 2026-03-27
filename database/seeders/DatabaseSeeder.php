<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            InternPolicySeeder::class,
            DepartmentSeeder::class,
            UniversitySeeder::class,
            UserSeeder::class,
            UserSettingSeeder::class,
            EmployeeSeeder::class,
            ApplicationSeeder::class,
            InternSeeder::class,
            AttendanceSeeder::class,
            DtrSubmissionSeeder::class,
            TaskSeeder::class,
            EvaluationSeeder::class,
            DocumentSeeder::class,
            NotificationSeeder::class,
        ]);
    }
}