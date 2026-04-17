<?php

namespace App\Http\Controllers;

use App\Http\Requests\UploadDocumentRequest;
use App\Models\Application;
use App\Http\Requests\StoreApplicationRequest;
use Illuminate\Http\Request;

class ApplicationController extends Controller
{
    // We inject your custom Request class here
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
        // 1. Find the application this document belongs to
        $application = \App\Models\Application::findOrFail($id);

        // 2. Check if a file was actually attached
        if ($request->hasFile('file')) {
            $file = $request->file('file');
            $type = $request->input('document_type');
            
            // 3. Save the file to our local storage (e.g., documents/resume/2026/04/)
            $folderPath = "documents/{$type}/" . date('Y/m');
            $savedFilePath = $file->store($folderPath, 'local');

            // 4. Save the document path to the database
            $document = $application->documents()->create([
                'document_type' => $type,
                'file_name' => $file->getClientOriginalName(),
                'file_path' => $savedFilePath,
                'file_size' => $file->getSize(),
                'status' => 'pending'
            ]);

            return response()->json([
                'message' => ucfirst($type) . ' uploaded successfully!',
                'data' => $document
            ], 201);
        }

        return response()->json(['message' => 'No file was provided.'], 400);
    }

}