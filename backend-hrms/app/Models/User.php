<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasFactory, HasApiTokens, Notifiable, SoftDeletes;

    protected $fillable = [
        'first_name',
        'last_name',
        'email',
        'mobile_number',
        'role_id',
        'department_id',
        'status',
        'failed_login_attempts',
        'locked_until',
        'password',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'locked_until' => 'datetime',
        ];
    }

    public function role(): BelongsTo
    {
        return $this->belongsTo(Role::class);
    }

    public function department(): BelongsTo
    {
        return $this->belongsTo(Department::class);
    }

    public function getFullNameAttribute()
    {
        return "{$this->first_name} {$this->last_name}";
    }

    public function hasRole(string $role): bool
    {
        return (bool) $this->role && strcasecmp($this->role->name, $role) === 0;
    }

    public function hasPermission(string $permission): bool
    {
        if (!$this->relationLoaded('role')) {
            $this->load('role.permissions');
        }

        return (bool) $this->role
            && $this->role->permissions->contains(fn (Permission $p) => $p->name === $permission);
    }

    public function isLocked(): bool
    {
        return $this->locked_until !== null && now()->lt($this->locked_until);
    }
}
