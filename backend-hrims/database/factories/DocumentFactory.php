<?php

namespace Database\Factories;

use App\Models\Intern;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class DocumentFactory extends Factory
{
    public function definition(): array
    {
        $type   = fake()->randomElement([
            'resume', 'moa', 'nda', 'endorsement_letter',
            'school_id', 'insurance', 'coa', 'coc',
        ]);

        $intern = Intern::inRandomOrder()->first();

        $uploader = in_array($type, ['coa', 'coc', 'nda'])
            ? User::whereIn('role', ['hr_admin', 'hr_staff'])->inRandomOrder()->first()
            : User::where('role', 'intern')->inRandomOrder()->first();

        return [
            'intern_id'           => $intern->id,
            'uploaded_by'         => $uploader->id,
            'document_type'       => $type,
            'file_name'           => $type . '_dummy.pdf',
            'file_path'           => 'documents/dummy/' . $type . '_dummy.pdf',
            'file_size'           => fake()->randomElement(['120 KB', '250 KB', '310 KB', '500 KB']),
            'status'              => fake()->randomElement(['pending', 'verified', 'rejected']),
            'follow_up_requested' => false,
            'follow_up_note'      => null,
            'follow_up_at'        => null,
            'follow_up_by'        => null,
            'uploaded_at'         => fake()->dateTimeBetween('-2 months', 'now'),
        ];
    }
}