<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Certificate extends Model
{
    protected $fillable = [
        'intern_id',
        'issued_by',
        'issued_at',
        'file_path',
        'verification_hash',
        'downloaded_at'
    ];

    protected $casts = [
        'issued_at' => 'datetime',
        'downloaded_at' => 'datetime',
    ];


    protected static function boot()
    {
        parent::boot();
        static::creating(function ($certificate) {
            $certificate->verification_hash = Str::uuid();
        });
    }

    public function intern()
    {
        return $this->belongsTo(Intern::class);
    }

    public function issuer()
    {
        return $this->belongsTo(User::class, 'issued_by');
    }
}
