<?php

namespace Database\Factories;

use App\Models\Department;
use App\Models\University;
use App\Models\User;
use App\Models\Role;
use Illuminate\Database\Eloquent\Factories\Factory;

class InternFactory extends Factory
{
    public function definition(): array
    {
        $required  = fake()->randomElement([200, 300, 486, 500]);
        $completed = fake()->numberBetween(0, $required);


        $internUser = User::whereHas('role', function ($query) {
            $query->where('name', 'Intern');
        })->inRandomOrder()->first();


        $supervisorUser = User::whereHas('role', function ($query) {
            $query->whereIn('name', ['Supervisor', 'HR Staff']);
        })->inRandomOrder()->first();

        $university = University::inRandomOrder()->first() ?? University::factory()->create();
        $department = Department::inRandomOrder()->first() ?? Department::factory()->create();

        return [

            'user_id'                => $internUser?->id ?? User::factory()->create()->id,
            'application_id'         => null,
            'university_id'          => $university->id,
            'department_id'          => $department->id,
            'supervisor_id'          => $supervisorUser->id ?? null,
            'first_name'             => fake()->firstName(),
            'last_name'              => fake()->lastName(),
            'mobile_number'          => '09' . fake()->numerify('#########'),
            'date_of_birth'          => fake()->dateTimeBetween('-25 years', '-18 years')->format('Y-m-d'),
            'gender'                 => fake()->randomElement(['male', 'female']),
            'address'                => fake()->streetAddress(),
            'city'                   => fake()->city(),
            'zip_code'               => fake()->numerify('####'),
            'nationality'            => 'Filipino',
            'marital_status'         => 'single',
            'course'                => fake()->randomElement([
                'BS Information Technology',
                'BS Computer Science',
                'BS Marketing Management',
                'BS Business Administration',
                'BS Accountancy',
            ]),
            'year_level'             => fake()->randomElement(['3rd Year', '4th Year']),
            'required_hours'         => $required,
            'expected_graduation'    => fake()->dateTimeBetween('now', '+2 years')->format('Y-m-d'),
            'completed_hours'        => $completed,
            'hours_today'            => fake()->randomFloat(2, 0, 9),
            'hours_last_computed_at' => now(),
            'start_date'             => fake()->dateTimeBetween('-3 months', 'now')->format('Y-m-d'),
            'end_date'               => fake()->dateTimeBetween('now', '+3 months')->format('Y-m-d'),
            'status'                 => fake()->randomElement(['active', 'active', 'active', 'completed', 'dropped']),
        ];
    }
}
