<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

use App\Models\Intern;
use App\Models\Certificate;
use App\Models\User;

class InternSeeder extends Seeder
{
    public function run(): void
    {

        $completedInterns = Intern::where('status', 'completed')->get();

        foreach ($completedInterns as $intern) {
            Certificate::create([
                'intern_id' => $intern->id,
                'issued_by' => User::where('role_id', 1)->first()->id,
                'file_path' => 'certificates/cert_' . $intern->id . '.pdf',
                'issued_at' => now(),
            ]);
        }
    }
}
