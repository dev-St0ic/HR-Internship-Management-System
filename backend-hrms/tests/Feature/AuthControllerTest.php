<?php

namespace Tests\Feature;

use App\Models\Role;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AuthControllerTest extends TestCase
{
    use RefreshDatabase;

    public function test_login_returns_token_for_valid_credentials(): void
    {
        $role = Role::factory()->create(['name' => 'HR Admin']);
        $user = User::factory()->create([
            'role_id' => $role->id,
            'email' => 'login@example.com',
            'password' => bcrypt('Password1'),
        ]);

        $response = $this->postJson('/api/v1/auth/login', [
            'email' => $user->email,
            'password' => 'Password1',
        ]);

        $response->assertStatus(200)
            ->assertJsonPath('status', 'success');
    }

    public function test_login_locks_account_after_five_failed_attempts(): void
    {
        $role = Role::factory()->create(['name' => 'Intern']);
        $user = User::factory()->create([
            'role_id' => $role->id,
            'email' => 'lock@example.com',
            'password' => bcrypt('Password1'),
        ]);

        for ($i = 0; $i < 5; $i++) {
            $this->postJson('/api/v1/auth/login', [
                'email' => $user->email,
                'password' => 'WrongPass1',
            ]);
        }

        $user->refresh();

        $this->assertEquals('locked', $user->status);
        $this->assertNotNull($user->locked_until);
    }
}
