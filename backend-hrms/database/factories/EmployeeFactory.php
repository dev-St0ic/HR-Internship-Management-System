<?php

namespace Database\Factories;

use App\Models\Department;
use App\Models\User;
use App\Models\Role;
use Illuminate\Database\Eloquent\Factories\Factory;

class EmployeeFactory extends Factory
{
    public function definition(): array
    {


        $user = User::whereHas('role', function ($query) {
            $query->whereIn('name', ['HR Staff', 'Supervisor']);
        })->inRandomOrder()->first();


        if (!$user) {
            $role = Role::whereIn('name', ['HR Staff', 'Supervisor'])->first();
            $user = User::factory()->create([
                'role_id' => $role ? $role->id : Role::factory(),
            ]);
        }


        $department = Department::inRandomOrder()->first() ?? Department::factory()->create();

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
