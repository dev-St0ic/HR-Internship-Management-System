<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Intern extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'application_id',
        'university_id',
        'department_id',
        'supervisor_id',
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
        'course',
        'year_level',
        'required_hours',
        'expected_graduation',
        'completed_hours',
        'hours_today',
        'hours_last_computed_at',
        'start_date',
        'end_date',
        'status',
    ];
}
