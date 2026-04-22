<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Carbon\Carbon;

class Task extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'intern_id',
        'supervisor_id',
        'task_title',
        'description',
        'deadline',
        'status',
        'priority',
        'completed_at'
    ];

    protected $casts = [
        'deadline'     => 'datetime',
        'completed_at' => 'datetime',
    ];



    public function intern()
    {
        return $this->belongsTo(Intern::class);
    }

    public function supervisor()
    {

        return $this->belongsTo(User::class, 'supervisor_id');
    }

    public function deliverables()
    {

        return $this->hasMany(TaskDeliverable::class);
    }



    public function isPending(): bool
    {
        return $this->status === 'pending';
    }
    public function isInProgress(): bool
    {
        return $this->status === 'in_progress';
    }
    public function isCompleted(): bool
    {
        return $this->status === 'completed';
    }
    public function isOnHold(): bool
    {
        return $this->status === 'on_hold';
    }
    public function isCancelled(): bool
    {
        return $this->status === 'cancelled';
    }

    public function isOverdue(): bool
    {
        return !$this->isCompleted() && $this->deadline->isPast();
    }

    public function markAsCompleted(): void
    {
        $this->update([
            'status' => 'completed',
            'completed_at' => now(),
        ]);
    }

    public function getPriorityLabelAttribute(): string
    {
        return ucfirst($this->priority);
    }
}
