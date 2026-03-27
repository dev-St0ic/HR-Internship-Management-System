<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class DtrSubmission extends Model
{
    use HasFactory;

    protected $fillable = [
        'intern_id', 'month', 'year',
        'total_hours', 'status',
        'reviewed_by', 'remarks', 'submitted_at',
    ];

    protected $casts = [
        'submitted_at' => 'datetime',
        'total_hours'  => 'decimal:2',
    ];

    public function intern()
    {
        return $this->belongsTo(Intern::class);
    }

    public function reviewer()
    {
        return $this->belongsTo(User::class, 'reviewed_by');
    }

    public function getPeriodLabelAttribute(): string
    {
        return Carbon::createFromDate($this->year, $this->month, 1)->format('M Y');
    }

    public function isPending(): bool  { return $this->status === 'pending'; }
    public function isApproved(): bool { return $this->status === 'approved'; }
    public function isRejected(): bool { return $this->status === 'rejected'; }
}