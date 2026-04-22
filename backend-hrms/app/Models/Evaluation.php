<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Carbon\Carbon;

class Evaluation extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'intern_id',
        'supervisor_id',
        'work_quality',
        'communication',
        'initiative',
        'attendance',
        'professionalism',
        'total_score',
        'remarks',
        'evaluation_date',
        'submitted_at',
        'status',
    ];

    protected $casts = [
        'total_score'     => 'decimal:2',
        'evaluation_date' => 'date',
        'submitted_at'    => 'datetime',
    ];



    public function intern()
    {
        return $this->belongsTo(Intern::class);
    }

    public function supervisor()
    {
        return $this->belongsTo(User::class, 'supervisor_id');
    }



    public function isDraft(): bool
    {
        return $this->status === 'draft';
    }
    public function isSubmitted(): bool
    {
        return $this->status === 'submitted';
    }
    public function isApproved(): bool
    {
        return $this->status === 'approved';
    }
    public function isRejected(): bool
    {
        return $this->status === 'rejected';
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
}
