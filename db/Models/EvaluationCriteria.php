<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EvaluationCriteria extends Model
{
    protected $fillable = ['criteria_key', 'label', 'max_score', 'weight', 'description'];

    protected $casts = [
        'weight' => 'float',
        'max_score' => 'integer'
    ];
}
