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
        'moa_file',
        'moa_start_date',
        'moa_end_date',
        'moa_status',
        'is_active',
    ];
}
