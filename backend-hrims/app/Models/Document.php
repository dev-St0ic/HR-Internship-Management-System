<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes; 

class Document extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'documentable_id', 'documentable_type', 
        
        'document_type', 'file_name', 'file_path', 'file_size',
        'status', 'uploaded_by', 'uploaded_at',
        
        'verified_by', 'verified_at', 'expiry_date',

        'follow_up_requested', 'follow_up_note', 'follow_up_at', 'follow_up_by',
    ];

    protected $casts = [
        'uploaded_at'         => 'datetime',
        'verified_at'         => 'datetime',
        'expiry_date'         => 'date',
        'follow_up_requested' => 'boolean',
        'follow_up_at'        => 'datetime',
    ];

    public function documentable()
    {
        return $this->morphTo();
    }

    public function uploader()
    {
        return $this->belongsTo(User::class, 'uploaded_by');
    }

    public function verifiedBy()
    {
        return $this->belongsTo(User::class, 'verified_by');
    }

    public function followUpBy()
    {
        return $this->belongsTo(User::class, 'follow_up_by');
    }

    // Status Helpers
    public function isVerified(): bool { return $this->status === 'verified'; }
    public function isPending(): bool  { return $this->status === 'pending'; }
    public function isRejected(): bool { return $this->status === 'rejected'; }

    // Follow Up Helper
    public function requestFollowUp(User $staff, string $note = ''): void
    {
        $this->update([
            'follow_up_requested' => true,
            'follow_up_note'      => $note,
            'follow_up_at'        => now(),
            'follow_up_by'        => $staff->id,
        ]);
    }

    // Type Label Formatter
    public function getTypeLabelAttribute(): string
    {
        return match ($this->document_type) {
            'resume'                => 'Resume',
            'moa'                   => 'MOA',
            'nda'                   => 'NDA',
            'endorsement_letter'    => 'Endorsement Letter',
            'enrollment_assessment' => 'Enrollment Assessment',
            'school_id'             => 'School ID',
            'insurance'             => 'Insurance',
            'coa'                   => 'Certificate of Acceptance',
            'coc'                   => 'Certificate of Completion',
            'evaluation'            => 'Evaluation Form',
            'dtr'                   => 'DTR',
            default                 => 'Other',
        };
    }
}