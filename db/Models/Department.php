<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Department extends Model
{
    use HasFactory;

    protected $fillable = [
        'department_name',
        'description',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];

    public function employees()
    {
        return $this->hasMany(Employee::class);
    }

    public function interns()
    {
        return $this->hasMany(Intern::class);
    }

    public function activeInterns()
    {
        return $this->hasMany(Intern::class)->where('status', 'active');
    }

    public function getActiveMemberCountAttribute(): int
    {
        return $this->employees()->where('is_active', true)->count();
    }
}