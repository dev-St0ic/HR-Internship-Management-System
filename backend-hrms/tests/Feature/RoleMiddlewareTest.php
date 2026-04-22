<?php

namespace Tests\Feature;

use App\Models\Role;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class RoleMiddlewareTest extends TestCase
{
    use RefreshDatabase;

    public function test_hr_admin_can_access_register_endpoint(): void
    {
        $adminRole = Role::factory()->create(['name' => 'HR Admin']);
        $targetRole = Role::factory()->create(['name' => 'Intern']);

        $admin = User::factory()->create(['role_id' => $adminRole->id]);
        /** @var User $admin */
        $admin = User::query()->whereKey($admin->id)->firstOrFail();

        $response = $this->actingAs($admin, 'sanctum')->postJson('/api/v1/auth/register', [
            'first_name' => 'Test',
            'last_name' => 'User',
            'email' => 'created@example.com',
            'password' => 'Password1',
            'password_confirmation' => 'Password1',
            'role_id' => $targetRole->id,
        ]);

        $response->assertStatus(201);
    }

    public function test_non_admin_cannot_access_register_endpoint(): void
    {
        $staffRole = Role::factory()->create(['name' => 'HR Staff']);
        $targetRole = Role::factory()->create(['name' => 'Intern']);

        $staff = User::factory()->create(['role_id' => $staffRole->id]);
        /** @var User $staff */
        $staff = User::query()->whereKey($staff->id)->firstOrFail();

        $response = $this->actingAs($staff, 'sanctum')->postJson('/api/v1/auth/register', [
            'first_name' => 'No',
            'last_name' => 'Access',
            'email' => 'denied@example.com',
            'password' => 'Password1',
            'password_confirmation' => 'Password1',
            'role_id' => $targetRole->id,
        ]);

        $response->assertStatus(403);
    }
}
