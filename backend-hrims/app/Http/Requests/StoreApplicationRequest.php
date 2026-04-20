<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreApplicationRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true; 
    }

    /**
     * Get the validation rules that apply to the request.
     */
    public function rules(): array
    {
        return [
            // These fields are NOT NULL in your database, so they must be required
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|email|max:255|unique:applications,email',
            'university' => 'required|string|max:255',
            'program' => 'required|string|max:255',
            'required_hours' => 'required|integer|min:1',

            // These fields allow NULL in your database, so we make them optional
            'mobile_number' => 'nullable|string|max:255',
            'date_of_birth' => 'nullable|date',
            'gender' => 'nullable|in:male,female,other',
            'nationality' => 'nullable|string|max:255',
            'address' => 'nullable|string|max:255',
            'city' => 'nullable|string|max:255',
            'zip_code' => 'nullable|string|max:10',
            'year_level' => 'nullable|string|max:255',
            'expected_graduation' => 'nullable|date',
            'preferred_department' => 'nullable|string|max:255',
        ];
    }
}