<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class ApplicationFactory extends Factory
{
    public function definition(): array
    {
        return [
            'first_name'                 => fake()->firstName(),
            'last_name'                  => fake()->lastName(),
            'email'                      => fake()->unique()->safeEmail(),
            'mobile_number'              => '09' . fake()->numerify('#########'),
            'date_of_birth'              => fake()->dateTimeBetween('-25 years', '-18 years')->format('Y-m-d'),
            'gender'                     => fake()->randomElement(['male', 'female']),
            'nationality'                => 'Filipino',
            'address'                    => fake()->streetAddress(),
            'city'                       => fake()->city(),
            'zip_code'                   => fake()->numerify('####'),
            'university'                 => fake()->randomElement([
                                                'Polytechnic University of the Philippines',
                                                'Cavite State University',
                                                'De La Salle University',
                                                'Far Eastern University',
                                           ]),
            'program'                    => fake()->randomElement([
                                                'BS Information Technology',
                                                'BS Computer Science',
                                                'BS Marketing Management',
                                                'BS Business Administration',
                                                'BS Accountancy',
                                           ]),
            'year_level'                 => fake()->randomElement(['1st Year', '2nd Year', '3rd Year', '4th Year']),
            'required_hours'             => fake()->randomElement([200, 300, 486, 500, 600]),
            'expected_graduation'        => fake()->dateTimeBetween('now', '+2 years')->format('Y-m-d'),
            'preferred_department'       => fake()->randomElement([
                                                'IT (All Dept)',
                                                'Marketing',
                                                'Finance',
                                                'Web Development',
                                                'Human Resources',
                                           ]),
            'resume_file'                => 'applications/dummy_resume.pdf',
            'moa_file'                   => 'applications/dummy_moa.pdf',
            'endorsement_file'           => 'applications/dummy_endorsement.pdf',
            'enrollment_assessment_file' => null,
            'school_id_file'             => 'applications/dummy_id.jpg',
            'insurance_file'             => null,
            'status'                     => fake()->randomElement([
                                                'pending',
                                                'hr_review',
                                                'for_admin_approval',
                                                'approved',
                                                'rejected',
                                           ]),
            'remarks'                    => fake()->optional()->sentence(),
            'reviewed_by'                => null,
            'approved_by'                => null,
            'assigned_department_id'     => null,
            'assigned_supervisor_id'     => null,
            'deployed_at'                => null,
            'submitted_at'               => fake()->dateTimeBetween('-3 months', 'now'),
        ];
    }
}