<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Report extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'report_type',
        'generated_by',
        'generated_at',
        'filters_applied',
        'file_path'
    ];

    protected $casts = [
        'filters_applied' => 'array',
        'generated_at' => 'datetime',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'generated_by');
    }
}
