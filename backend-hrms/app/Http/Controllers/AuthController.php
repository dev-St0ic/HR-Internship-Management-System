<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use App\Models\PasswordReset;
use App\Models\User;
use App\Services\AuthService;
use App\Services\TokenService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function __construct(
        private readonly AuthService $authService,
        private readonly TokenService $tokenService
    ) {
    }

    /**
     * Login user
     */
    public function login(Request $request)
    {
        $validated = $request->validate([
            'email' => 'required|email',
            'password' => 'required|string|min:8',
        ]);

        $throttleKey = strtolower($validated['email']) . '|' . $request->ip();

        if (RateLimiter::tooManyAttempts($throttleKey, 5)) {
            return response()->json([
                'message' => 'Too many login attempts. Please try again in a minute.',
            ], 429);
        }

        $user = User::where('email', $validated['email'])->first();

        if (!$user) {
            RateLimiter::hit($throttleKey, 60);
            return response()->json([
                'message' => 'Invalid credentials'
            ], 401);
        }

        if ($user->isLocked()) {
            return response()->json([
                'message' => 'Account is locked. Please try again later.',
            ], 423);
        }

        if (!$user || !Hash::check($validated['password'], $user->password)) {
            $user->increment('failed_login_attempts');

            if ((int) $user->failed_login_attempts >= 5) {
                $this->authService->lockAccount($user);
            }

            RateLimiter::hit($throttleKey, 60);

            return response()->json([
                'message' => 'Invalid credentials'
            ], 401);
        }

        RateLimiter::clear($throttleKey);

        $user->forceFill([
            'failed_login_attempts' => 0,
            'locked_until' => null,
            'status' => 'active',
        ])->save();

        $user->loadMissing('role.permissions');

        $token = $this->tokenService->issueToken($user);

        return response()->json([
            'token' => $token,
            'user' => new UserResource($user),
            'permissions' => $user->role?->permissions?->pluck('name')->values() ?? [],
        ]);
    }

    /**
     * Register new user
     */
    public function register(Request $request)
    {
        $validated = $request->validate([
            'first_name' => 'required|string',
            'last_name' => 'required|string',
            'email' => 'required|email|unique:users',
            'password' => 'required|string|min:8|confirmed',
            'mobile_number' => 'nullable|string',
            'role_id' => 'required|exists:roles,id',
        ]);

        $user = $this->authService->createUser($validated);
        $user->loadMissing('role.permissions');

        $token = $this->tokenService->issueToken($user);

        return response()->json([
            'token' => $token,
            'user' => new UserResource($user),
        ], 201);
    }

    /**
     * Get current user
     */
    public function me(Request $request)
    {
        $user = $request->user()->loadMissing('role.permissions');

        return response()->json([
            'user' => new UserResource($user),
        ]);
    }

    /**
     * Logout user
     */
    public function logout(Request $request)
    {
        $currentToken = $request->user()->currentAccessToken();
        $this->tokenService->invalidateCurrentToken($request->user(), $currentToken?->id);

        return response()->json([
            'message' => 'Logged out successfully',
        ]);
    }

    public function refreshToken(Request $request)
    {
        $currentToken = $request->user()->currentAccessToken();
        $token = $this->tokenService->refreshToken($request->user(), $currentToken?->id);

        return response()->json([
            'token' => $token,
            'message' => 'Token refreshed successfully.',
        ]);
    }

    public function passwordReset(Request $request)
    {
        $validated = $request->validate([
            'email' => 'required|email|exists:users,email',
        ]);

        $otp = (string) random_int(100000, 999999);

        PasswordReset::where('email', $validated['email'])->delete();

        PasswordReset::create([
            'email' => $validated['email'],
            'otp' => $otp,
            'is_used' => false,
            'expires_at' => now()->addMinutes(15),
        ]);

        // Mailer integration can send reset OTP/link; token is returned for API integration testing.
        return response()->json([
            'message' => 'Password reset token generated.',
            'token' => $otp,
        ]);
    }

    public function resetPassword(Request $request)
    {
        $validated = $request->validate([
            'email' => 'required|email',
            'token' => 'required|string|size:6',
            'password' => 'required|string|min:8|confirmed',
        ]);

        $this->authService->validatePasswordPolicy($validated['password']);

        $resetToken = PasswordReset::where('email', $validated['email'])
            ->where('otp', $validated['token'])
            ->where('is_used', false)
            ->first();

        if (!$resetToken || !$resetToken->isValid()) {
            throw ValidationException::withMessages([
                'token' => ['Reset token is invalid or expired.'],
            ]);
        }

        DB::transaction(function () use ($validated, $resetToken): void {
            User::where('email', $validated['email'])->update([
                'password' => Hash::make($validated['password']),
                'failed_login_attempts' => 0,
                'locked_until' => null,
                'status' => 'active',
            ]);

            $resetToken->forceFill(['is_used' => true])->save();
        });

        return response()->json([
            'message' => 'Password reset successfully.',
        ]);
    }
}
