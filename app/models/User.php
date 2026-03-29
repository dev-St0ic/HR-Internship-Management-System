<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
        'is_active',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];

    public function isHrAdmin(): bool    { return $this->role === 'hr_admin'; }
    public function isHrStaff(): bool    { return $this->role === 'hr_staff'; }
    public function isSupervisor(): bool { return $this->role === 'supervisor'; }
    public function isIntern(): bool     { return $this->role === 'intern'; }

    public function isHrTeam(): bool
    {
        return in_array($this->role, ['hr_admin', 'hr_staff']);
    }

    public function settings()
    {
        return $this->hasOne(UserSetting::class);
    }

    public function employee()
    {
        return $this->hasOne(Employee::class);
    }

    public function internProfile()
    {
        return $this->hasOne(Intern::class);
    }

    public function supervisedInterns()
    {
        return $this->hasMany(Intern::class, 'supervisor_id');
    }

    public function assignedTasks()
    {
        return $this->hasMany(Task::class, 'assigned_by');
    }

    public function submittedEvaluations()
    {
        return $this->hasMany(Evaluation::class, 'supervisor_id');
    }

    public function reviewedApplications()
    {
        return $this->hasMany(Application::class, 'reviewed_by');
    }

    public function approvedApplications()
    {
        return $this->hasMany(Application::class, 'approved_by');
    }

    public function dtrOverrides()
    {
        return $this->hasMany(Attendance::class, 'overridden_by');
    }

    public function notifications()
    {
        return $this->hasMany(Notification::class);
    }

    public function systemLogs()
    {
        return $this->hasMany(SystemLog::class);
    }

    public function uploadedDocuments()
    {
        return $this->hasMany(Document::class, 'uploaded_by');
    }

    public function taskComments()
    {
        return $this->hasMany(TaskComment::class);
    }
}