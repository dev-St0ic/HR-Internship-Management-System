<?php

namespace App\Http\Controllers;

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

}