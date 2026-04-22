<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckRole
{
    public function handle(Request $request, Closure $next, string ...$roles): Response
    {
        $user = $request->user();

        if (!$user || !$user->role) {
            return response()->json([
                'status' => 'error',
                'message' => 'Unauthorized action',
            ], 403);
        }

        $allowed = collect($roles)->contains(
            fn (string $role) => strcasecmp($role, $user->role->name) === 0
        );

        if (!$allowed) {
            return response()->json([
                'status' => 'error',
                'message' => 'Unauthorized action',
            ], 403);
        }

        return $next($request);
    }
}
