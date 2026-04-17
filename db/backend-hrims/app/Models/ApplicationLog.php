<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ApplicationLog extends Model
{
    protected $fillable = [
        'application_id',
        'changed_by',
        'from_status',
        'to_status',
        'remarks',
        'changed_at',
    ];

    protected $casts = [
        'changed_at' => 'datetime',
    ];

    public function application()
    {
        return $this->belongsTo(Application::class);
    }

    public function changedBy()
    {
        return $this->belongsTo(User::class, 'changed_by');
    }
}