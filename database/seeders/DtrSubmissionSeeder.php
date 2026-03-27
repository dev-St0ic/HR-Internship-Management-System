<?php

namespace Database\Seeders;

use App\Models\DtrSubmission;
use Illuminate\Database\Seeder;

class DtrSubmissionSeeder extends Seeder
{
    public function run(): void
    {
        DtrSubmission::factory(10)->create();
    }
}