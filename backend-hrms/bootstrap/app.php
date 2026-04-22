<?php

use Illuminate\Foundation\Application;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Laravel\Sanctum\SanctumServiceProvider;

return Application::configure(basePath: dirname(__DIR__))
    ->withProviders([
        SanctumServiceProvider::class,
    ])
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function ($middleware) {
        // CORS must be global so preflight OPTIONS requests are handled
        // even when they do not match a specific API route.
        $middleware->append(
            \Illuminate\Http\Middleware\HandleCors::class,
        );

        $middleware->api(prepend: [
            \App\Http\Middleware\ApiResponseMiddleware::class,
        ]);

        $middleware->alias([
            'role' => \App\Http\Middleware\CheckRole::class,
            'permission' => \App\Http\Middleware\CheckPermission::class,
        ]);
    })
    ->withExceptions(function ($exceptions) {
        $exceptions->render(function (AuthenticationException $e, Request $request) {
            return response()->json([
                'status' => 'error',
                'message' => 'Unauthenticated',
            ], 401);
        });

        $exceptions->render(function (AuthorizationException $e, Request $request) {
            return response()->json([
                'status' => 'error',
                'message' => 'Unauthorized action',
            ], 403);
        });

        $exceptions->render(function (NotFoundHttpException $e, Request $request) {
            return response()->json([
                'status' => 'error',
                'message' => 'Resource not found',
            ], 404);
        });

        $exceptions->render(function (ValidationException $e, Request $request) {
            return response()->json([
                'status' => 'error',
                'errors' => $e->errors(),
            ], 422);
        });

        $exceptions->render(function (\Throwable $e, Request $request) {
            report($e);

            return response()->json([
                'status' => 'error',
                'message' => 'Server error',
            ], 500);
        });
    })
    ->create();
