<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserSetting extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'theme',
        'language',
        'two_factor_enabled',
        'mobile_push_notifications',
        'desktop_notifications',
        'email_notifications',
    ];

    protected $casts = [
        'two_factor_enabled'         => 'boolean',
        'mobile_push_notifications'  => 'boolean',
        'desktop_notifications'      => 'boolean',
        'email_notifications'        => 'boolean',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}