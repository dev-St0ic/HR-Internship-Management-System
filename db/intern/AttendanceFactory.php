<?php

namespace Database\Factories;

use App\Models\Intern;
use Illuminate\Database\Eloquent\Factories\Factory;

class AttendanceFactory extends Factory
{
    public function definition(): array
    {
        $timeIn    = fake()->dateTimeBetween('08:30:00', '10:00:00')->format('H:i:s');
        $timeOut   = '18:00:00';
        $breakMins = fake()->randomElement([15, 30, 45, 60]);
        $inCarbon  = \Carbon\Carbon::parse($timeIn);
        $outCarbon = \Carbon\Carbon::parse($timeOut);
        $workHrs   = round(($outCarbon->diffInMinutes($inCarbon) - $breakMins) / 60, 2);
        $isLate    = $inCarbon->format('H:i:s') > '09:15:00';

        $intern = Intern::inRandomOrder()->first();

        return [
            'intern_id'              => $intern->id,
            'date'                   => fake()->dateTimeBetween('-30 days', 'now')->format('Y-m-d'),
            'time_in'                => $timeIn,
            'time_out'               => $timeOut,
            'break_duration_minutes' => $breakMins,
            'working_hours'          => $workHrs,
            'status'                 => $isLate ? 'late' : 'on_time',
            'supervisor_approved'    => fake()->boolean(70),
            'is_overridden'          => false,
            'overridden_by'          => null,
            'override_reason'        => null,
            'original_time_in'       => null,
            'original_time_out'      => null,
            'overridden_at'          => null,
        ];
    }
}