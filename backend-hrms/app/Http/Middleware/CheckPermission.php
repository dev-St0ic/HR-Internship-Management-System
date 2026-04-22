<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckPermission
{
    public function handle(Request $request, Closure $next, string ...$permissions): Response
    {
        $user = $request->user();

        if (!$user || !$user->role) {
            return response()->json([
                'status' => 'error',
                'message' => 'Unauthorized action',
            ], 403);
        }

        $user->loadMissing('role.permissions');

        $authorized = collect($permissions)->every(function (string $permission) use ($user): bool {
            return $user->role->permissions->contains('name', $permission);
        });

        if (!$authorized) {
            return response()->json([
                'status' => 'error',
                'message' => 'Unauthorized action',
            ], 403);
        }

        return $next($request);
    }
}
