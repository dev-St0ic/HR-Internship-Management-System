<?php

namespace App\Http\Controllers;

use App\Models\Application;
use App\Models\Document;
use App\Http\Requests\StoreApplicationRequest;
use App\Http\Requests\UploadDocumentRequest;
use App\Services\FileUploadService;
use App\Services\AuthService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Resources\ApplicationResource;
use App\Http\Resources\ApplicationCollection;
use Illuminate\Support\Facades\Mail;
use App\Mail\ApplicationApprovedMail;

class ApplicationController extends Controller
{
    protected $fileUploadService;
    protected $authService;

    // Inject BOTH Services
    public function __construct(FileUploadService $fileUploadService, AuthService $authService)
    {
        $this->fileUploadService = $fileUploadService;
        $this->authService = $authService;
    }

    public function store(StoreApplicationRequest $request)
    {
        $validatedData = $request->validated();
        $application = Application::create($validatedData);

        return response()->json([
            'message' => 'Application submitted successfully!',
            'data' => $application
        ], 201);
    }

    public function uploadDocuments(UploadDocumentRequest $request, $id)
    {
        $application = Application::findOrFail($id);
        $uploadedDocs = [];

        DB::beginTransaction();

        try {
            foreach ($request->documents as $docData) {
                $file = $docData['file'];
                $type = $docData['type'];

                $savedFilePath = $this->fileUploadService->upload($file, $type);

                $document = $application->documents()->create([
                    'document_type' => $type,
                    'file_name'     => $file->getClientOriginalName(),
                    'file_path'     => $savedFilePath,
                    'file_size'     => $file->getSize(),
                    'status'        => 'pending',
                ]);

                $uploadedDocs[] = $document;
            }

            DB::commit();

            return response()->json([
                'message' => 'Documents uploaded successfully!',
                'data'    => $uploadedDocs
            ], 201);
        } catch (\Exception $e) {
            DB::rollBack();

            return response()->json([
                'message' => 'Failed to upload documents.',
                'error'   => $e->getMessage()
            ], 500);
        }
    }

    public function index(Request $request)
    {
        $query = Application::query();

        if ($request->has('status')) {
            $query->where('status', $request->input('status'));
        }

        if ($request->has('university')) {
            $query->where('university', 'like', '%' . $request->input('university') . '%');
        }

        if ($request->has('date')) {
            $query->whereDate('submitted_at', $request->input('date'));
        }

        $applications = $query->latest('submitted_at')->paginate(10);

        return new ApplicationCollection($applications);
    }

    public function show($id)
    {
        $application = Application::with('documents')->findOrFail($id);

        return response()->json([
            'message' => 'Application retrieved successfully.',
            'data'    => new ApplicationResource($application)
        ], 200);
    }

    public function getStatus($id)
    {
        $application = Application::findOrFail($id);

        return response()->json([
            'message' => 'Status retrieved successfully',
            'status'  => $application->status
        ], 200);
    }

    /**
     * HR Admin: Approve application and generate Intern account
     */
    public function approve(Request $request, $id)
    {
        $application = Application::findOrFail($id);

        if ($application->status !== 'pending') {
            return response()->json(['message' => 'Application has already been processed.'], 400);
        }

        // 1. Change status to approved
        $application->update(['status' => 'approved']);

        // 2. Generate the User and Intern accounts
        $accountDetails = $this->authService->createInternAccount($application);

        // Send the Welcome Email
        Mail::to($application->email)->send(new ApplicationApprovedMail($application, $accountDetails['password']));

        return response()->json([
            'message' => 'Application approved! Intern account generated successfully.',
            'data'    => [
                'intern_id' => $accountDetails['intern']->id,
                'user_id'   => $accountDetails['user']->id,
                'email'     => $accountDetails['user']->email,
                'temporary_password' => $accountDetails['password'] // Sending this back for testing purposes
            ]
        ], 200);
    }

    /**
     * HR Admin: Reject application
     */
    public function reject(Request $request, $id)
    {
        $application = Application::findOrFail($id);

        if ($application->status !== 'pending') {
            return response()->json(['message' => 'Application has already been processed.'], 400);
        }

        // Allow HR to optionally submit a rejection reason
        $request->validate(['reason' => 'nullable|string']);

        // 1. Change status to rejected
        $application->update(['status' => 'rejected']);

        // 2. TODO: EmailService will be called right here to send the rejection notification

        return response()->json([
            'message' => 'Application rejected successfully.',
            'reason'  => $request->input('reason')
        ], 200);
    }
}
