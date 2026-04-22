<?php

namespace Database\Factories;

use App\Models\User;
use App\Models\Role;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;

class UserFactory extends Factory
{
    protected $model = User::class;

    public function definition(): array
    {
        $role = Role::inRandomOrder()->first() ?? Role::factory()->create();

        return [
            'first_name'       => fake()->firstName(),
            'last_name'        => fake()->lastName(),
            'email'            => fake()->unique()->safeEmail(),
            'mobile_number'    => '09' . fake()->numerify('#########'),
            'role_id'          => $role->id,
            'password'         => Hash::make('password'),
            'email_verified_at' => now(),
        ];
    }
}
