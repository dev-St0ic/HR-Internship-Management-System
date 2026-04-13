<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Intern extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'application_id',
        'university_id',
        'department_id',
        'supervisor_id',

        'first_name',
        'last_name',
        'mobile_number',
        'date_of_birth',
        'gender',
        'address',
        'city',
        'zip_code',
        'nationality',
        'marital_status',

        'course',
        'year_level',
        'required_hours',
        'expected_graduation',

        'completed_hours',
        'hours_today',
        'hours_last_computed_at',

        'start_date',
        'end_date',
        'status',
    ];

    protected $casts = [
        'date_of_birth'          => 'date',
        'expected_graduation'    => 'date',
        'start_date'             => 'date',
        'end_date'               => 'date',
        'completed_hours'        => 'decimal:2',
        'hours_today'            => 'decimal:2',
        'hours_last_computed_at' => 'datetime',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function application()
    {
        return $this->belongsTo(Application::class);
    }

    public function university()
    {
        return $this->belongsTo(University::class);
    }

    public function department()
    {
        return $this->belongsTo(Department::class);
    }

    public function supervisor()
    {
        return $this->belongsTo(User::class, 'supervisor_id');
    }

    public function attendance()
    {
        return $this->hasMany(Attendance::class);
    }

    public function dtrSubmissions()
    {
        return $this->hasMany(DtrSubmission::class);
    }

    public function tasks()
    {
        return $this->hasMany(Task::class);
    }

    public function evaluations()
    {
        return $this->hasMany(Evaluation::class);
    }

    public function documents()
    {
        return $this->hasMany(Document::class);
    }

    public function getFullNameAttribute(): string
    {
        return "{$this->first_name} {$this->last_name}";
    }

    public function getRemainingHours(): float
    {
        return max(0, $this->required_hours - $this->completed_hours);
    }

    public function getProgressPercentAttribute(): float
    {
        if ($this->required_hours == 0) return 0;
        return round(($this->completed_hours / $this->required_hours) * 100, 2);
    }

    public function isActive(): bool
    {
        return $this->status === 'active';
    }
    public function isCompleted(): bool
    {
        return $this->status === 'completed';
    }
    public function isDropped(): bool
    {
        return $this->status === 'dropped';
    }

    public function getLatestEvaluation(): ?Evaluation
    {
        return $this->evaluations()
            ->orderByDesc('year')
            ->orderByDesc('month')
            ->first();
    }

    public function refreshHoursCache(): void
    {
        $completed = $this->attendance()
            ->whereIn('status', ['on_time', 'late'])
            ->sum('working_hours');

        $today = $this->attendance()
            ->whereDate('date', today())
            ->value('working_hours') ?? 0;

        $this->update([
            'completed_hours'        => $completed,
            'hours_today'            => $today,
            'hours_last_computed_at' => now(),
        ]);
    }
}
