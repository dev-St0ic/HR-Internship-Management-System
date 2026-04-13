<?php

namespace Database\Factories;

use App\Models\Document;
use App\Models\User;
use App\Models\Intern;
use Illuminate\Database\Eloquent\Factories\Factory;

class DocumentFactory extends Factory
{
    protected $model = Document::class;

    public function definition(): array
    {
        return [

            'intern_id'   => Intern::inRandomOrder()->first()?->id ?? Intern::factory(),


            'uploaded_by' => User::inRandomOrder()->first()?->id ?? User::factory(),


            'document_type' => fake()->randomElement([
                'resume',
                'moa',
                'nda',
                'endorsement_letter',
                'enrollment_assessment',
                'school_id',
                'insurance',
                'coa',
                'coc',
                'evaluation',
                'dtr',
                'other'
            ]),


            'file_name' => fake()->word() . '.pdf',

            'file_path' => 'documents/' . fake()->uuid() . '.pdf',
            'file_size' => fake()->numberBetween(100, 5000) . ' KB',


            'status'    => fake()->randomElement(['pending', 'verified', 'expired', 'archived']),

            'follow_up_requested' => false,
            'uploaded_at'         => now(),
        ];
    }
}
