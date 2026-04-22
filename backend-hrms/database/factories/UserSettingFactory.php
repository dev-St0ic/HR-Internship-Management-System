<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class UserSettingFactory extends Factory
{
    public function definition(): array
    {
        return [
            'user_id'                   => User::inRandomOrder()->first()->id,
            'theme'                     => fake()->randomElement(['light', 'dark', 'system']),
            'language'                  => 'en',
            'two_factor_enabled'        => false,
            'mobile_push_notifications' => true,
            'desktop_notifications'     => true,
            'email_notifications'       => true,
        ];
    }
}