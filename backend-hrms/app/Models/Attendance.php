<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Carbon\Carbon;

class Attendance extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'attendance';

    protected $fillable = [
        'intern_id',
        'date',
        'time_in',
        'time_out',
        'total_hours',
        'status',
        'remarks',
        'recorded_by',
        'supervisor_approved',
        'is_overridden',
        'overridden_by',
        'override_reason',
        'original_time_in',
        'original_time_out',
        'overridden_at',
    ];

    protected $casts = [
        'date'                => 'date',
        'total_hours'         => 'decimal:2',
        'supervisor_approved' => 'boolean',
        'is_overridden'       => 'boolean',
        'overridden_at'       => 'datetime',
    ];



    public function intern()
    {
        return $this->belongsTo(Intern::class);
    }

    public function recordedBy()
    {
        return $this->belongsTo(User::class, 'recorded_by');
    }

    public function overriddenBy()
    {
        return $this->belongsTo(User::class, 'overridden_by');
    }



    public function isPresent(): bool
    {
        return $this->status === 'present';
    }
    public function isLate(): bool
    {
        return $this->status === 'late';
    }
    public function isAbsent(): bool
    {
        return $this->status === 'absent';
    }
    public function isPartial(): bool
    {
        return $this->status === 'partial';
    }
    public function isExcused(): bool
    {
        return $this->status === 'excused';
    }



    public function getTotalHoursFormattedAttribute(): string
    {
        $minutes = (int)($this->total_hours * 60);
        $h = intdiv($minutes, 60);
        $m = $minutes % 60;
        return sprintf('%02d:%02d Hrs', $h, $m);
    }



    /**
     * Replaces computeWorkingHours() to match new column naming
     */
    public function computeTotalHours(int $breakMinutes = 0): float
    {
        if (!$this->time_in || !$this->time_out) return 0;

        $in  = Carbon::parse($this->time_in);
        $out = Carbon::parse($this->time_out);


        if ($out->lt($in)) return 0;

        $totalMinutes = $out->diffInMinutes($in) - $breakMinutes;
        return round(max(0, $totalMinutes) / 60, 2);
    }

    /**
     * Updated Override Logic
     */
    public function applyOverride(
        User   $admin,
        string $newTimeIn,
        string $newTimeOut,
        string $reason
    ): void {

        $origIn = $this->is_overridden ? $this->original_time_in : $this->time_in;
        $origOut = $this->is_overridden ? $this->original_time_out : $this->time_out;

        $this->update([
            'original_time_in'    => $origIn,
            'original_time_out'   => $origOut,
            'time_in'             => $newTimeIn,
            'time_out'            => $newTimeOut,
            'total_hours'         => $this->computeTotalHours(),
            'is_overridden'       => true,
            'overridden_by'       => $admin->id,
            'override_reason'     => $reason,
            'overridden_at'       => now(),
        ]);


        if (method_exists($this->intern, 'refreshHoursCache')) {
            $this->intern->refreshHoursCache();
        }
    }
}
