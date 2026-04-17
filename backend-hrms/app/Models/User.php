<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable, SoftDeletes;

    protected $fillable = [
        'name',
        'email',
        'password',
        'phone',
        'role_id',
        'status',

        'department_id',
        'max_interns',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
        'status' => 'integer',
    ];



    public function role()
    {
        return $this->belongsTo(Role::class);
    }

    public function department()
    {
        return $this->belongsTo(Department::class);
    }



    public function assignedTasks()
    {

        return $this->hasMany(Task::class, 'supervisor_id');
    }

    public function uploadedDeliverables()
    {

        return $this->hasMany(TaskDeliverable::class, 'uploaded_by');
    }



    public function recordedAttendance()
    {

        return $this->hasMany(Attendance::class, 'recorded_by');
    }

    public function dtrOverrides()
    {
        return $this->hasMany(Attendance::class, 'overridden_by');
    }



    public function internProfile()
    {
        return $this->hasOne(Intern::class, 'user_id');
    }

    public function supervisedInterns()
    {
        return $this->hasMany(Intern::class, 'supervisor_id');
    }





    public function hasPermission(string $permission): bool
    {
        return $this->role->permissions->contains('name', $permission);
    }

    public function isHrAdmin(): bool
    {
        return $this->role?->name === 'HR Admin';
    }
    public function isHrStaff(): bool
    {
        return $this->role?->name === 'HR Staff';
    }
    public function isSupervisor(): bool
    {
        return $this->role?->name === 'Supervisor';
    }
    public function isIntern(): bool
    {
        return $this->role?->name === 'Intern';
    }

    public function isHrTeam(): bool
    {
        return in_array($this->role?->name, ['HR Admin', 'HR Staff']);
    }
}
