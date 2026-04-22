<?php

use App\Http\Controllers\API\DashboardController;

Route::get('/dashboard', [DashboardController::class, 'index']);