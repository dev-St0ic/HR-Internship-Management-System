<?php

namespace Database\Seeders;

use App\Models\Attendance;
use Illuminate\Database\Seeder;

class AttendanceSeeder extends Seeder 
{
    public function run(): void 
    {
        Attendance::factory(10)->create();
    }
}