<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TaskDeliverable extends Model
{
    use HasFactory;


    protected $table = 'task_deliverables';

    protected $fillable = [
        'task_id',
        'file_path',
        'uploaded_by',
        'uploaded_at',
        'feedback',
        'feedback_given_at'
    ];

    protected $casts = [
        'uploaded_at'       => 'datetime',
        'feedback_given_at' => 'datetime',
    ];

    public function task()
    {
        return $this->belongsTo(Task::class);
    }

    public function uploader()
    {
        return $this->belongsTo(User::class, 'uploaded_by');
    }


    public function hasFeedback(): bool
    {
        return !is_null($this->feedback_given_at);
    }
}
