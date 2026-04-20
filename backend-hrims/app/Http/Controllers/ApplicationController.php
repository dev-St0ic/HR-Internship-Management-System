<?php

namespace App\Http\Controllers;

use App\Models\Application;
use App\Models\Document;
use App\Http\Requests\StoreApplicationRequest;
use App\Http\Requests\UploadDocumentRequest;
use App\Services\FileUploadService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ApplicationController extends Controller
{
    protected $fileUploadService;

    // Inject the FileUploadService
    public function __construct(FileUploadService $fileUploadService)
    {
        $this->fileUploadService = $fileUploadService;
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

        // Begin a database transaction in case a file upload fails midway
        DB::beginTransaction();

        try {
            foreach ($request->documents as $docData) {
                $file = $docData['file'];
                $type = $docData['type'];

                // 1. Use the Service to store the file
                $savedFilePath = $this->fileUploadService->upload($file, $type);

                // 2. Save the polymorphic document record to the database
                $document = $application->documents()->create([
                    'document_type' => $type,
                    'file_name'     => $file->getClientOriginalName(),
                    'file_path'     => $savedFilePath,
                    'file_size'     => $file->getSize(),
                    'status'        => 'pending',
                    // Optional: If the user is authenticated, you can set 'uploaded_by' => auth()->id()
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
}