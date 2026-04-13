<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class NotificationFactory extends Factory
{
    public function definition(): array
    {
        $type = fake()->randomElement([
            'application_submitted', 'application_approved',
            'dtr_submitted', 'dtr_approved', 'missing_dtr',
            'task_assigned', 'task_submitted', 'task_overdue',
            'evaluation_due', 'moa_expiring', 'general',
        ]);

        $user = User::inRandomOrder()->first();

        return [
            'user_id'    => $user->id,
            'title'      => fake()->sentence(4),
            'message'    => fake()->sentence(10),
            'type'       => $type,
            'action_url' => '/' . fake()->randomElement([
                                'dashboard', 'recruitment',
                                'attendance', 'tasks', 'evaluations',
                            ]),
            'is_read'    => fake()->boolean(30),
        ];
    }
}