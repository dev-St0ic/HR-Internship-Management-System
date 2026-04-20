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
            'documents'          => 'required|array',
            'documents.*.file'   => 'required|file|max:10240', // 10MB limit (10240 KB)
            'documents.*.type'   => 'required|string|in:resume,moa,nda,endorsement_letter,enrollment_assessment,school_id,insurance,coa,coc,evaluation,dtr,other',
        ];
    }
}