<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class University extends Model
{
    use HasFactory;

    protected $fillable = [
        'university_name',
        'branch',
        'contact_person',
        'contact_email',
        'contact_number',
        'moa_file',
        'moa_start_date',
        'moa_end_date',
        'moa_status',
        'is_active',
    ];

    protected $casts = [
        'moa_start_date' => 'date',
        'moa_end_date'   => 'date',
        'is_active'      => 'boolean',
    ];

    public function interns()
    {
        return $this->hasMany(Intern::class);
    }

    public function activeInterns()
    {
        return $this->hasMany(Intern::class)->where('status', 'active');
    }

    public function getDisplayNameAttribute(): string
    {
        return $this->branch
            ? "{$this->university_name} — {$this->branch}"
            : $this->university_name;
    }

    public function isMoaExpired(): bool
    {
        return $this->moa_end_date && $this->moa_end_date->isPast();
    }

    public function isMoaExpiringSoon(int $days = 30): bool
    {
        return $this->moa_end_date
            && $this->moa_end_date->isBetween(now(), now()->addDays($days));
    }

    public function syncMoaStatus(): void
    {
        $status = match (true) {
            $this->isMoaExpired()      => 'expired',
            $this->isMoaExpiringSoon() => 'expiring',
            default                    => 'active',
        };

        if ($this->moa_status !== $status) {
            $this->update(['moa_status' => $status]);
        }
    }
}
