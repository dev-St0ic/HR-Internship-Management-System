<?php

use App\Http\Controllers\API\DashboardController;

Route::prefix('v1')->group(function () {

    // hr dashboard routes
    Route::get('/dashboard', [DashboardController::class, 'index']);

    // activity routes
    Route::get('/dashboard/activities', [DashboardController::class, 'recentActivities']);
    
    Route::get('/dashboard/stats', [DashboardController::class, 'internStats']);

    // intern dashboard routes
    Route::get('/intern/dashboard', [DashboardController::class, 'internDashboard']);

    // api routes for testing
    Route::get('/test', function () {
        return response()->json(['message' => 'API working']);
    });
});
