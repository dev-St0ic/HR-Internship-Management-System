<?php

namespace App\Services;

use App\Models\User;
use App\Models\Intern;
use App\Models\Application;
use App\Models\University;
use App\Models\Department;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;

class AuthService
{
    /**
     * Automatically generate an Intern account from an Approved Application
     */
    public function createInternAccount(Application $application)
    {
        return DB::transaction(function () use ($application) {
            
            // 1. Generate a random 10-character password
            $plainPassword = Str::random(10);

            // 2. Create the base User account for logging in
            $user = User::create([
                'name'     => $application->first_name . ' ' . $application->last_name,
                'email'    => $application->email,
                'password' => Hash::make($plainPassword),
            ]);

            // 3. Handle strict Foreign Keys using your team's exact column names!
            $university = University::firstOrCreate([
                'university_name' => $application->university
            ]);
            
            $departmentName = $application->preferred_department ?? 'General';
            $department = Department::firstOrCreate([
                'department_name' => $departmentName
            ]);

            // Fallback for supervisor (Requires at least 1 user in the DB to act as supervisor)
            $supervisor = User::first() ?? $user; 

            // 4. Create the Intern profile
            $intern = Intern::create([
                'user_id'             => $user->id,
                'application_id'      => $application->id,
                'university_id'       => $university->id,
                'department_id'       => $department->id,
                'supervisor_id'       => $supervisor->id, 
                
                // Personal Details mapped from application
                'first_name'          => $application->first_name,
                'last_name'           => $application->last_name,
                'mobile_number'       => $application->mobile_number,
                'date_of_birth'       => $application->date_of_birth,
                'gender'              => $application->gender,
                'address'             => $application->address,
                'city'                => $application->city,
                'zip_code'            => $application->zip_code,
                'nationality'         => $application->nationality,
                
                // Academic & Internship Details
                'program'             => $application->program,
                'year_level'          => $application->year_level,
                'required_hours'      => $application->required_hours,
                'expected_graduation' => $application->expected_graduation,
                
                // Dates (Placeholders since HR usually sets these upon approval)
                'start_date'          => now(),
                'end_date'            => now()->addMonths(3), 
                'status'              => 'active',
            ]);

            // Return the raw password so the EmailService can send it
            return [
                'user'     => $user,
                'intern'   => $intern,
                'password' => $plainPassword 
            ];
        });
    }
}