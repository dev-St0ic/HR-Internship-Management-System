<?php

namespace Database\Factories;

use App\Models\Intern;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class EvaluationFactory extends Factory
{
    public function definition(): array
    {
        $intern     = Intern::inRandomOrder()->first();
        $supervisor = User::whereIn('role', ['supervisor', 'hr_staff'])->inRandomOrder()->first();

        return [
            'intern_id'           => $intern->id,
            'supervisor_id'       => $supervisor->id,
            'month'               => fake()->numberBetween(1, 12),
            'year'                => 2026,
            'work_quality'        => fake()->numberBetween(1, 5),
            'communication'       => fake()->numberBetween(1, 5),
            'initiative'          => fake()->numberBetween(1, 5),
            'attendance'          => fake()->numberBetween(1, 5),
            'professionalism'     => fake()->numberBetween(1, 5),
            'supervisor_comments' => fake()->optional()->paragraph(),
            'status'              => fake()->randomElement(['pending', 'completed']),
        ];
    }
}