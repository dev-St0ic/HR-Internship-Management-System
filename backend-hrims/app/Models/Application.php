<?php

namespace App\Models;

use App\Models\Document;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Application extends Model
{
    use HasFactory, SoftDeletes;


    protected $fillable = [

        'first_name', 'last_name', 'email', 'mobile_number',
        'date_of_birth', 'gender', 'nationality',
        'address', 'city', 'zip_code',

        'university', 'program', 'year_level', 'required_hours',
        'expected_graduation', 'preferred_department',

        'resume_file', 'moa_file', 'endorsement_file',
        'enrollment_assessment_file', 'school_id_file', 'insurance_file',

        'status', 'remarks', 'reviewed_by', 'approved_by',

        'assigned_department_id', 'assigned_supervisor_id',
        'deployed_at', 'submitted_at',
    ];

    protected $casts = [
        'date_of_birth'       => 'date',
        'expected_graduation' => 'date',
        'submitted_at'        => 'datetime',
        'deployed_at'         => 'datetime',
    ];

    public function reviewer()
    {
        return $this->belongsTo(User::class, 'reviewed_by');
    }

    public function approver()
    {
        return $this->belongsTo(User::class, 'approved_by');
    }

    public function assignedDepartment()
    {
        return $this->belongsTo(Department::class, 'assigned_department_id');
    }

    public function assignedSupervisor()
    {
        return $this->belongsTo(User::class, 'assigned_supervisor_id');
    }

    public function logs()
    {
        return $this->hasMany(ApplicationLog::class);
    }

    public function intern()
    {
        return $this->hasOne(Intern::class);
    }


    public function getFullNameAttribute(): string
    {
        return "{$this->first_name} {$this->last_name}";
    }

    public function isPending(): bool          { return $this->status === 'pending'; }
    public function isUnderHrReview(): bool    { return $this->status === 'hr_review'; }
    public function isForAdminApproval(): bool { return $this->status === 'for_admin_approval'; }
    public function isApproved(): bool         { return $this->status === 'approved'; }
    public function isReadyToDeploy(): bool    { return $this->status === 'deploy'; }
    public function isRejected(): bool         { return $this->status === 'rejected'; }

    public function getStatusLabelAttribute(): string
    {
        return match ($this->status) {
            'pending'            => 'Pending',
            'hr_review'          => 'Under Review',
            'for_admin_approval' => 'For Admin Approval',
            'approved'           => 'Approved',
            'deploy'             => 'Deploy',
            'rejected'           => 'Rejected',
            default              => 'Unknown',
        };
    }

    public function getMissingDocumentsAttribute(): array
    {
        $required = ['resume_file', 'moa_file', 'endorsement_file', 'school_id_file'];
        return array_filter($required, fn($doc) => empty($this->$doc));
    }

    public function documents()
    {
        return $this->morphMany(Document::class, 'documentable');
    }
}