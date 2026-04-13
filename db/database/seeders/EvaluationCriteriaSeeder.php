<?php

namespace Database\Seeders;

use App\Models\EvaluationCriteria;
use Illuminate\Database\Seeder;

class EvaluationCriteriaSeeder extends Seeder
{
    public function run(): void
    {
        $criteria = [
            [
                'criteria_key' => 'work_quality',
                'label'        => 'Work Quality',
                'max_score'    => 5,
                'weight'       => 0.30,
                'description'  => 'Accuracy, thoroughness, and effectiveness of completed tasks.'
            ],
            [
                'criteria_key' => 'communication',
                'label'        => 'Communication',
                'max_score'    => 5,
                'weight'       => 0.15,
                'description'  => 'Ability to express ideas clearly and professional interaction with the team.'
            ],
            [
                'criteria_key' => 'initiative',
                'label'        => 'Initiative',
                'max_score'    => 5,
                'weight'       => 0.20,
                'description'  => 'Self-starting, resourcefulness, and willingness to take on new challenges.'
            ],
            [
                'criteria_key' => 'attendance',
                'label'        => 'Attendance & Punctuality',
                'max_score'    => 5,
                'weight'       => 0.15,
                'description'  => 'Reliability in reporting for duty and adherence to work schedules.'
            ],
            [
                'criteria_key' => 'professionalism',
                'label'        => 'Professionalism',
                'max_score'    => 5,
                'weight'       => 0.20,
                'description'  => 'Ethical behavior, positive attitude, and adherence to company policies.'
            ],
        ];

        foreach ($criteria as $item) {
            EvaluationCriteria::updateOrCreate(
                ['criteria_key' => $item['criteria_key']],
                $item
            );
        }
    }
}
