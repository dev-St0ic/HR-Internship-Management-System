<?php

namespace Tests\Feature;

use App\Services\AuthService;
use Illuminate\Validation\ValidationException;
use Tests\TestCase;

class PasswordPolicyTest extends TestCase
{
    public function test_password_policy_rejects_weak_password(): void
    {
        $service = app(AuthService::class);

        $this->expectException(ValidationException::class);

        $service->validatePasswordPolicy('weakpass');
    }

    public function test_password_policy_accepts_valid_password(): void
    {
        $service = app(AuthService::class);

        $service->validatePasswordPolicy('StrongPass1');

        $this->assertTrue(true);
    }
}
