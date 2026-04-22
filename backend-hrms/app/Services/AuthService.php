<?php

namespace App\Services;

use App\Models\Role;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthService
{
    public function createUser(array $data): User
    {
        $this->validatePasswordPolicy($data['password'] ?? '');

        if (User::where('email', $data['email'])->exists()) {
            throw ValidationException::withMessages([
                'email' => ['The email has already been taken.'],
            ]);
        }

        $role = isset($data['role_id'])
            ? Role::find($data['role_id'])
            : Role::where('name', $data['role'] ?? 'Intern')->first();

        if (!$role) {
            throw ValidationException::withMessages([
                'role_id' => ['A valid role is required.'],
            ]);
        }

        return User::create([
            'first_name' => $data['first_name'],
            'last_name' => $data['last_name'],
            'email' => $data['email'],
            'mobile_number' => $data['mobile_number'] ?? null,
            'role_id' => $role->id,
            'status' => 'active',
            'password' => Hash::make($data['password']),
            'failed_login_attempts' => 0,
            'locked_until' => null,
        ]);
    }

    public function createInternAccount(array $data): array
    {
        $temporaryPassword = $data['temporary_password'] ?? $this->generateTemporaryPassword();

        $user = $this->createUser([
            'first_name' => $data['first_name'],
            'last_name' => $data['last_name'],
            'email' => $data['email'],
            'mobile_number' => $data['mobile_number'] ?? null,
            'password' => $temporaryPassword,
            'role' => 'Intern',
        ]);

        // Placeholder for mailer integration. We keep credentials payload for caller-level notifications.
        return [
            'user' => $user,
            'temporary_password' => $temporaryPassword,
        ];
    }

    public function validatePasswordPolicy(string $password): void
    {
        $isValid = strlen($password) >= 8
            && preg_match('/[a-z]/', $password)
            && preg_match('/[A-Z]/', $password)
            && preg_match('/\d/', $password);

        if (!$isValid) {
            throw ValidationException::withMessages([
                'password' => [
                    'Password must be at least 8 characters and include uppercase, lowercase, and a number.',
                ],
            ]);
        }
    }

    public function lockAccount(User $user): void
    {
        $user->forceFill([
            'status' => 'locked',
            'locked_until' => now()->addMinutes(15),
        ])->save();
    }

    private function generateTemporaryPassword(): string
    {
        $random = strtoupper(bin2hex(random_bytes(3)));

        return 'Tmp' . $random . '9a';
    }
}
