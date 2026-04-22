<?php

namespace App\Services;

use App\Models\User;

class TokenService
{
    public function issueToken(User $user, string $name = 'auth_token'): string
    {
        return $user->createToken($name)->plainTextToken;
    }

    public function refreshToken(User $user, ?string $tokenId = null): string
    {
        if ($tokenId !== null) {
            $user->tokens()->where('id', $tokenId)->delete();
        }

        return $this->issueToken($user, 'auth_refresh');
    }

    public function invalidateCurrentToken(User $user, ?string $tokenId = null): void
    {
        if ($tokenId !== null) {
            $user->tokens()->where('id', $tokenId)->delete();
            return;
        }

        $user->tokens()->delete();
    }
}
