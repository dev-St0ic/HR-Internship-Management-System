<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class InternPolicy extends Model
{
    protected $table = 'intern_policy';

    protected $fillable = [
        'grace_period_minutes',
        'work_start_time',
        'work_end_time',
        'required_working_hours_per_day',
        'moa_expiry_alert_days',
        'allow_mobile_timein',
        'require_dtr_approval',
    ];

    protected $casts = [
        'allow_mobile_timein'  => 'boolean',
        'require_dtr_approval' => 'boolean',
    ];

    public static function current(): self
    {
        return static::firstOrCreate([], [
            'grace_period_minutes'           => 15,
            'work_start_time'                => '09:00:00',
            'work_end_time'                  => '18:00:00',
            'required_working_hours_per_day' => 8,
            'moa_expiry_alert_days'          => 30,
            'allow_mobile_timein'            => false,
            'require_dtr_approval'           => true,
        ]);
    }

    public function getLateThresholdTime(): string
    {
        return \Carbon\Carbon::parse($this->work_start_time)
            ->addMinutes($this->grace_period_minutes)
            ->format('H:i:s');
    }
}