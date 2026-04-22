<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ApplicationResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id'                  => $this->id,
            'first_name'          => $this->first_name,
            'last_name'           => $this->last_name,
            'email'               => $this->email,
            'university'          => $this->university,
            'program'             => $this->program,
            'required_hours'      => $this->required_hours,
            'status'              => $this->status,
            'submitted_at'        => $this->submitted_at,

            // This pulls in the documents automatically!
            'documents'           => $this->whenLoaded('documents'),
        ];
    }
}
