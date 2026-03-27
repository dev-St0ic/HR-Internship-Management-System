<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Employee extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'department_id',
        'employee_id',
        'first_name',
        'last_name',
        'mobile_number',
        'date_of_birth',
        'gender',
        'address',
        'city',
        'zip_code',
        'nationality',
        'marital_status',
        'designation',
        'employment_type',
        'employment_status',
        'is_active',
    ];

    protected $casts = [
        'date_of_birth' => 'date',
        'is_active'     => 'boolean',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function department()
    {
        return $this->belongsTo(Department::class);
    }

    public function supervisedInterns()
    {
        return $this->hasMany(Intern::class, 'supervisor_id', 'user_id');
    }

    public function getFullNameAttribute(): string
    {
        return "{$this->first_name} {$this->last_name}";
    }

    public function isRemote(): bool
    {
        return $this->employment_type === 'remote';
    }

    public function getRoleAttribute(): string
    {
        return $this->user->role ?? 'unknown';
    }
}