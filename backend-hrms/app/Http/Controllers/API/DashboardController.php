<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Services\DashboardService;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    protected $dashboardService;

    public function __construct(DashboardService $dashboardService)
    {
        $this->dashboardService = $dashboardService;
    }

    public function index()
{
    $data = [
        'total_interns' => $this->dashboardService->getTotalInterns(),
        'active_interns' => $this->dashboardService->getActiveInterns(),
        'completed_interns' => $this->dashboardService->getCompletedInterns(),
        'universities' => $this->dashboardService->getPartnerUniversities(),
        'recent_activities' => $this->dashboardService->getRecentActivities(),
    ];

    return view('dashboard', compact('data'));
}
}