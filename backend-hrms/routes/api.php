<?php

use App\Http\Controllers\API\DashboardController;

Route::prefix('v1')->group(function () {

    Route::get('/dashboard', [DashboardController::class, 'index']);
    Route::get('/dashboard/activities', [DashboardController::class, 'recentActivities']);
    Route::get('/dashboard/stats', [DashboardController::class, 'internStats']);

    Route::get('/intern/dashboard', [DashboardController::class, 'internDashboard']);
    Route::get('/test', function () {
        return response()->json(['message' => 'API working']);
    });
});