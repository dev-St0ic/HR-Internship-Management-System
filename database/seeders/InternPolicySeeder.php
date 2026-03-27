<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class InternPolicySeeder extends Seeder 
{
    public function run(): void 
    {
        DB::table('intern_policy')->insertOrIgnore([
            'grace_period_minutes'           => 15,
            'work_start_time'                => '09:00:00',
            'work_end_time'                  => '18:00:00',
            'required_working_hours_per_day' => 8,
            'moa_expiry_alert_days'          => 30,
            'allow_mobile_timein'            => false,
            'require_dtr_approval'           => true,
            'created_at'                     => now(),
            'updated_at'                     => now(),
        ]);
    }
}