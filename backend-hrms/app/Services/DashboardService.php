<?php

namespace App\Services;

use App\Models\Intern;
use App\Models\University;
use Spatie\Activitylog\Models\Activity;

class DashboardService
{
    public function getTotalInterns()
    {
        return Intern::count();
    }

    public function getActiveInterns()
    {
        return Intern::where('status', 'active')->count();
    }

    public function getCompletedInterns()
    {
        return Intern::where('status', 'completed')->count();
    }

    public function getPartnerUniversities()
    {
        return University::withCount('interns')->get();
    }

    public function getRecentActivities()
    {
        return Activity::latest()->limit(20)->get();
    }

    public function getInternPersonalStats($userId)
    {
        $intern = Intern::where('user_id', $userId)->first();

        if (!$intern) {
            return null;
        }

        return [
            'completed_hours' => $intern->completed_hours,
            'required_hours' => $intern->required_hours,
            'remaining_hours' => $intern->required_hours - $intern->completed_hours,
            'status' => $intern->status,
            'end_date' => $intern->end_date,
        ];
    }
}