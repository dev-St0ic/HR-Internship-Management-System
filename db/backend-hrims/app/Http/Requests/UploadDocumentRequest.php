<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UploadDocumentRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true; 
    }

    public function rules(): array
    {
        return [
            // Ensure they tell us what kind of document this is
            'document_type' => 'required|string|in:resume,endorsement,moa,transcript,school_id',
            
            // Validate the actual file (max 10240 kilobytes = 10MB)
            'file' => 'required|file|mimes:pdf,doc,docx,jpg,png|max:10240',
        ];
    }
}