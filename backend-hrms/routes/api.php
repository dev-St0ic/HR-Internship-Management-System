<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

// Health check
Route::get('/health', function () {
    return response()->json(['status' => 'ok']);
});

// Public auth routes
Route::post('/auth/login', [AuthController::class, 'login']);
Route::post('/auth/register', [AuthController::class, 'register']);

// Protected routes
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/auth/me', [AuthController::class, 'getCurrentUser']);
    Route::post('/auth/logout', [AuthController::class, 'logout']);
    
    // Add more protected endpoints here
});
