<?php

namespace App\Http\Controllers;

use App\Models\Application;
use App\Models\ApplicationLog;
use App\Models\Intern;
use App\Services\AuthService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ApplicationController extends Controller
{
    public function __construct(
        private readonly AuthService $authService
    ) {
    }

    public function approve(Request $request, Application $application)
    {
        $validated = $request->validate([
            'remarks' => 'nullable|string|max:1000',
        ]);

        if ($application->status === 'approved') {
            return response()->json([
                'message' => 'Application is already approved.',
            ], 422);
        }

        if ($application->intern()->exists()) {
            return response()->json([
                'message' => 'Intern account has already been created for this application.',
            ], 422);
        }

        return DB::transaction(function () use ($request, $application, $validated) {
            $fromStatus = $application->status ?? 'pending';

            $application->forceFill([
                'status' => 'approved',
                'approved_by' => $request->user()->id,
                'remarks' => $validated['remarks'] ?? $application->remarks,
                'deployed_at' => now(),
            ])->save();

            $credentials = $this->authService->createInternAccount([
                'first_name' => $application->first_name,
                'last_name' => $application->last_name,
                'email' => $application->email,
                'mobile_number' => $application->mobile_number,
            ]);

            $intern = Intern::create([
                'user_id' => $credentials['user']->id,
                'application_id' => $application->id,
                'department_id' => $application->assigned_department_id,
                'supervisor_id' => $application->assigned_supervisor_id,
                'first_name' => $application->first_name,
                'last_name' => $application->last_name,
                'mobile_number' => $application->mobile_number,
                'date_of_birth' => $application->date_of_birth,
                'gender' => $application->gender,
                'address' => $application->address,
                'city' => $application->city,
                'zip_code' => $application->zip_code,
                'nationality' => $application->nationality,
                'course' => $application->program,
                'year_level' => $application->year_level,
                'required_hours' => $application->required_hours ?? 200,
                'expected_graduation' => $application->expected_graduation,
                'status' => 'active',
                'start_date' => now()->toDateString(),
            ]);

            ApplicationLog::create([
                'application_id' => $application->id,
                'changed_by' => $request->user()->id,
                'from_status' => $fromStatus,
                'to_status' => 'approved',
                'remarks' => $validated['remarks'] ?? null,
                'changed_at' => now(),
            ]);

            return response()->json([
                'message' => 'Application approved and intern account created.',
                'application_id' => $application->id,
                'intern_id' => $intern->id,
                'user_id' => $credentials['user']->id,
                'temporary_password' => $credentials['temporary_password'],
            ], 201);
        });
    }
}
