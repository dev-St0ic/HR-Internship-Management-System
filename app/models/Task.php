<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    use HasFactory;

    protected $fillable = [
        'intern_id', 'assigned_by',
        'task_title', 'description', 'priority',
        'start_date', 'deadline', 'finish_date',
        'deliverable_file',
        'is_submitted', 'submitted_at', 'supervisor_notified',
        'status',
    ];

    protected $casts = [
        'start_date'          => 'date',
        'deadline'            => 'date',
        'finish_date'         => 'date',
        'submitted_at'        => 'datetime',
        'is_submitted'        => 'boolean',
        'supervisor_notified' => 'boolean',
    ];

    public function intern()
    {
        return $this->belongsTo(Intern::class);
    }

    public function assignedBy()
    {
        return $this->belongsTo(User::class, 'assigned_by');
    }

    public function comments()
    {
        return $this->hasMany(TaskComment::class);
    }

    public function isNotStarted(): bool { return $this->status === 'not_started'; }
    public function isInProgress(): bool { return $this->status === 'in_progress'; }
    public function isCompleted(): bool  { return $this->status === 'completed'; }
    public function isOverdue(): bool    { return $this->status === 'overdue'; }

    public function checkAndMarkOverdue(): void
    {
        if (!$this->isCompleted() && $this->deadline->isPast()) {
            $this->update(['status' => 'overdue']);
        }
    }

    public function submitWork(string $filePath): void
    {
        $this->update([
            'deliverable_file'    => $filePath,
            'is_submitted'        => true,
            'submitted_at'        => now(),
            'supervisor_notified' => false,
            'status'              => 'completed',
            'finish_date'         => today(),
        ]);
    }

    public function getPriorityLabelAttribute(): string
    {
        return ucfirst($this->priority);
    }
}