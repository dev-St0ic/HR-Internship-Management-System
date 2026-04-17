<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ApplicationController;

// Grouping all routes under /api/v1/
Route::prefix('v1')->group(function () {
    
    // Public routes for Applicants
    // The throttle limits users to 10 requests per 1 minute to prevent spam
    Route::middleware('throttle:10,1')->group(function () {
        Route::post('/applications', [ApplicationController::class, 'store']);
        Route::post('/applications/{id}/upload-documents', [ApplicationController::class, 'uploadDocuments']);
        Route::get('/applications/status/{id}', [ApplicationController::class, 'getStatus']);
    });

    // Protected Routes for HR (We will add authentication to these later)
    Route::get('/applications', [ApplicationController::class, 'index']);
    Route::get('/applications/{id}', [ApplicationController::class, 'show']);
    Route::put('/applications/{id}/approve', [ApplicationController::class, 'approve']);
    Route::put('/applications/{id}/reject', [ApplicationController::class, 'reject']);
});