<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class Attendance extends Model
{
    use HasFactory;

    protected $table = 'attendance';

    protected $fillable = [
        'intern_id', 'date',
        'time_in', 'time_out',
        'break_duration_minutes', 'working_hours',
        'status', 'supervisor_approved',

        'is_overridden', 'overridden_by', 'override_reason',
        'original_time_in', 'original_time_out', 'overridden_at',
    ];

    protected $casts = [
        'date'                => 'date',
        'working_hours'       => 'decimal:2',
        'supervisor_approved' => 'boolean',
        'is_overridden'       => 'boolean',
        'overridden_at'       => 'datetime',
    ];

    public function intern()
    {
        return $this->belongsTo(Intern::class);
    }

    public function overriddenBy()
    {
        return $this->belongsTo(User::class, 'overridden_by');
    }

    public function isOnTime(): bool { return $this->status === 'on_time'; }
    public function isLate(): bool   { return $this->status === 'late'; }
    public function isAbsent(): bool { return $this->status === 'absent'; }
    public function isPending(): bool{ return $this->status === 'pending'; }

    public function getBreakFormattedAttribute(): string
    {
        $h = intdiv($this->break_duration_minutes, 60);
        $m = $this->break_duration_minutes % 60;
        return $h > 0
            ? sprintf('%02d:%02d Hrs', $h, $m)
            : sprintf('%02d Min', $m);
    }

    public function getWorkingHoursFormattedAttribute(): string
    {
        $h = intdiv((int)($this->working_hours * 60), 60);
        $m = (int)($this->working_hours * 60) % 60;
        return sprintf('%02d:%02d Hrs', $h, $m);
    }

    public function computeWorkingHours(): float
    {
        if (!$this->time_in || !$this->time_out) return 0;
        $in    = Carbon::parse($this->time_in);
        $out   = Carbon::parse($this->time_out);
        $total = $out->diffInMinutes($in) - $this->break_duration_minutes;
        return round(max(0, $total) / 60, 2);
    }

    public function applyOverride(
        User   $admin,
        string $newTimeIn,
        string $newTimeOut,
        string $reason
    ): void {
        $this->update([

            'original_time_in'    => $this->time_in,
            'original_time_out'   => $this->time_out,

            'time_in'             => $newTimeIn,
            'time_out'            => $newTimeOut,
            'working_hours'       => $this->computeWorkingHours(),

            'is_overridden'       => true,
            'overridden_by'       => $admin->id,
            'override_reason'     => $reason,
            'overridden_at'       => now(),
        ]);

        $this->intern->refreshHoursCache();
    }
}