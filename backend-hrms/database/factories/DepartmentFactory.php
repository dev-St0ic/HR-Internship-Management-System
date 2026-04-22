<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class DepartmentFactory extends Factory
{
    public function definition(): array
    {
        return [
            'department_name' => fake()->unique()->randomElement([
                'Human Resources',
                'Information Technology',
                'Marketing',
                'Finance',
                'Operations',
                'Web Development',
                'Multimedia',
                'Special Project',
                'Admin',
                'Sales',
            ]),
            'description' => fake()->sentence(),
            'is_active'   => true,
        ];
    }
}