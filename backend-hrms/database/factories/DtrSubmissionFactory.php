<?php

namespace Database\Factories;

use App\Models\Intern;
use Illuminate\Database\Eloquent\Factories\Factory;

class DtrSubmissionFactory extends Factory
{
    public function definition(): array
    {
        $intern = Intern::inRandomOrder()->first();

        return [
            'intern_id'    => $intern->id,
            'month'        => fake()->numberBetween(1, 12),
            'year'         => 2026,
            'total_hours'  => fake()->randomFloat(2, 40, 200),
            'status'       => fake()->randomElement(['pending', 'approved', 'rejected']),
            'reviewed_by'  => null,
            'remarks'      => fake()->optional()->sentence(),
            'submitted_at' => fake()->dateTimeBetween('-2 months', 'now'),
        ];
    }
}