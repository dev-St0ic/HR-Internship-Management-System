<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ApplicationController;

// Health check
Route::get('/health', function () {
    return response()->json(['status' => 'ok']);
});

Route::prefix('v1')->group(function () {
    // Public auth routes
    Route::post('/auth/login', [AuthController::class, 'login'])->middleware('throttle:10,1');
    Route::post('/auth/password-reset', [AuthController::class, 'passwordReset'])->middleware('throttle:5,1');
    Route::post('/auth/reset-password', [AuthController::class, 'resetPassword'])->middleware('throttle:5,1');

    // Protected routes
    Route::middleware('auth:sanctum')->group(function () {
        Route::post('/auth/register', [AuthController::class, 'register'])
            ->middleware(['throttle:10,1', 'role:HR Admin']);
        Route::post('/applications/{application}/approve', [ApplicationController::class, 'approve'])
            ->middleware(['throttle:10,1', 'role:HR Admin']);
        Route::get('/auth/me', [AuthController::class, 'me']);
        Route::post('/auth/logout', [AuthController::class, 'logout']);
        Route::post('/auth/refresh-token', [AuthController::class, 'refreshToken']);
    });
});

// Legacy compatibility routes (non-versioned)
Route::prefix('auth')->group(function () {
    Route::post('/login', [AuthController::class, 'login'])->middleware('throttle:10,1');
    Route::post('/password-reset', [AuthController::class, 'passwordReset'])->middleware('throttle:5,1');
    Route::post('/reset-password', [AuthController::class, 'resetPassword'])->middleware('throttle:5,1');

    Route::middleware('auth:sanctum')->group(function () {
        Route::post('/register', [AuthController::class, 'register'])
            ->middleware(['throttle:10,1', 'role:HR Admin']);
        Route::post('/applications/{application}/approve', [ApplicationController::class, 'approve'])
            ->middleware(['throttle:10,1', 'role:HR Admin']);
        Route::get('/me', [AuthController::class, 'me']);
        Route::post('/logout', [AuthController::class, 'logout']);
        Route::post('/refresh-token', [AuthController::class, 'refreshToken']);
    });
});
