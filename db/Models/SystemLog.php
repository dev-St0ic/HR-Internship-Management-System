<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class SystemLog extends Model
{
    protected $fillable = [
        'user_id',
        'action',
        'description',
        'model_type',
        'model_id',
        'old_values',
        'new_values',
        'ip_address',
        'user_agent',
        'performed_at',
    ];

    protected $casts = [
        'old_values'   => 'array',
        'new_values'   => 'array',
        'performed_at' => 'datetime',
    ];


    public $timestamps = false;

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function subject()
    {
        return $this->morphTo('model');
    }

    public static function record(
        string $action,
        string $description = '',
        ?Model $subject = null,
        array $oldValues = [],
        array $newValues = []
    ): void {
        static::create([
            'user_id'      => Auth::id(),
            'action'       => $action,
            'description'  => $description,
            'model_type'   => $subject ? get_class($subject) : null,
            'model_id'     => $subject?->id,
            'old_values'   => !empty($oldValues) ? $oldValues : null,
            'new_values'   => !empty($newValues) ? $newValues : null,
            'ip_address'   => request()?->ip(),
            'user_agent'   => request()?->userAgent(),
            'performed_at' => now(),
        ]);
    }
}
