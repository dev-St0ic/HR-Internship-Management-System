<?php

namespace Database\Factories;

use App\Models\Department;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class EmployeeFactory extends Factory
{
    public function definition(): array
    {

        $user       = User::whereIn('role', ['hr_staff', 'supervisor'])
                          ->inRandomOrder()->first();
        $department = Department::inRandomOrder()->first();

        return [
            'user_id'           => $user->id,
            'department_id'     => $department->id,
            'employee_id'       => 'EMP-' . str_pad(fake()->unique()->numberBetween(1, 9999), 4, '0', STR_PAD_LEFT),
            'first_name'        => fake()->firstName(),
            'last_name'         => fake()->lastName(),
            'mobile_number'     => '09' . fake()->numerify('#########'),
            'date_of_birth'     => fake()->dateTimeBetween('-40 years', '-22 years')->format('Y-m-d'),
            'gender'            => fake()->randomElement(['male', 'female']),
            'address'           => fake()->streetAddress(),
            'city'              => fake()->city(),
            'zip_code'          => fake()->numerify('####'),
            'nationality'       => 'Filipino',
            'marital_status'    => fake()->randomElement(['single', 'married']),
            'designation'       => fake()->jobTitle(),
            'employment_type'   => fake()->randomElement(['office', 'remote']),
            'employment_status' => 'permanent',
            'is_active'         => true,
        ];
    }
}