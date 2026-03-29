<?php

namespace Database\Factories;

use App\Models\Intern;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class TaskFactory extends Factory
{
    public function definition(): array
    {
        $startDate = fake()->dateTimeBetween('-2 months', 'now')->format('Y-m-d');
        $deadline  = fake()->dateTimeBetween($startDate, '+1 month')->format('Y-m-d');

        $intern     = Intern::inRandomOrder()->first();
        $supervisor = User::whereIn('role', ['supervisor', 'hr_staff'])->inRandomOrder()->first();

        return [
            'intern_id'           => $intern->id,
            'assigned_by'         => $supervisor->id,
            'task_title'          => fake()->randomElement([
                                         'Data entry projects',
                                         'HR documentation support',
                                         'Research assignments',
                                         'Marketing or development tasks',
                                         'QA Website report',
                                         'Social media content calendar',
                                         'Competitor analysis report',
                                         'Operations flowchart',
                                     ]),
            'description'         => fake()->paragraph(),
            'priority'            => fake()->randomElement(['high', 'moderate', 'low']),
            'start_date'          => $startDate,
            'deadline'            => $deadline,
            'finish_date'         => null,
            'deliverable_file'    => null,
            'is_submitted'        => false,
            'submitted_at'        => null,
            'supervisor_notified' => false,
            'status'              => fake()->randomElement([
                                         'not_started',
                                         'in_progress',
                                         'completed',
                                         'overdue',
                                     ]),
        ];
    }
}