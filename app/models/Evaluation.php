<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class Evaluation extends Model
{
    use HasFactory;

    protected $fillable = [
        'intern_id', 'supervisor_id',
        'month', 'year',
        'work_quality', 'communication',
        'initiative', 'attendance', 'professionalism',
        'supervisor_comments', 'status',
    ];

    protected $casts = [
        'total_score' => 'decimal:2',
    ];


    public function intern()
    {
        return $this->belongsTo(Intern::class);
    }

    public function supervisor()
    {
        return $this->belongsTo(User::class, 'supervisor_id');
    }

    public function getPeriodLabelAttribute(): string
    {
        return Carbon::createFromDate($this->year, $this->month, 1)->format('M Y');
    }

    public function getPerformanceRatingAttribute(): string
    {
        return match (true) {
            $this->total_score >= 23 => 'Excellent',
            $this->total_score >= 19 => 'Good',
            $this->total_score >= 15 => 'Satisfactory',
            $this->total_score >= 10 => 'Needs Improvement',
            default                  => 'Poor',
        };
    }

    public function isPending(): bool   { return $this->status === 'pending'; }
    public function isCompleted(): bool { return $this->status === 'completed'; }
}