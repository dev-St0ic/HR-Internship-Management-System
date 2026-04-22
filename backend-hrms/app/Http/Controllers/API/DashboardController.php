<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Services\DashboardService;
use Illuminate\Http\Request;
use App\Http\Resources\ActivityResource;

class DashboardController extends Controller
{
    protected $dashboardService;

    public function __construct(DashboardService $dashboardService)
    {
        $this->dashboardService = $dashboardService;
    }

    // hr dashboard controller
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

    // intern dashboard controller
    public function internDashboard()
    {
        // temporary intern data
        $userId = 1;

        return response()->json(
            $this->dashboardService->getInternPersonalStats($userId)
        );
    }

    // activity_logs controlloer
    public function recentActivities()
    {
        return ActivityResource::collection(
            $this->dashboardService->getRecentActivities()
        );
    }
}