<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class UniversityFactory extends Factory
{
    public function definition(): array
    {
        return [
            'university_name' => fake()->randomElement([
                'Polytechnic University of the Philippines',
                'Cavite State University',
                'Pamantasan ng Lungsod ng Marikina',
                'De La Salle University',
                'Far Eastern University',
                'University of Santo Tomas',
                'Mapua University',
                'Technological University of the Philippines',
                'National University',
                'Lyceum of the Philippines',
            ]),
            'branch'          => fake()->randomElement(['Main', 'Branch 1', 'Branch 2', null]),
            'contact_person'  => fake()->name(),
            'contact_email'   => fake()->safeEmail(),
            'moa_file'        => null,
            'moa_start_date'  => fake()->dateTimeBetween('-2 years', 'now')->format('Y-m-d'),
            'moa_end_date'    => fake()->dateTimeBetween('now', '+2 years')->format('Y-m-d'),
            'moa_status'      => 'active',
            'is_active'       => true,
        ];
    }
}