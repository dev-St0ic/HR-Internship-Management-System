<?php

namespace Database\Factories;

use App\Models\Intern;
use App\Models\User;
use App\Models\Attendance;
use Illuminate\Database\Eloquent\Factories\Factory;
use Carbon\Carbon;

class AttendanceFactory extends Factory
{
    protected $model = Attendance::class;

    public function definition(): array
    {

        $timeIn    = fake()->dateTimeBetween('08:00:00', '10:30:00')->format('H:i:s');
        $timeOut   = '17:00:00';
        $inCarbon  = Carbon::parse($timeIn);
        $outCarbon = Carbon::parse($timeOut);



        $totalHrs  = round($outCarbon->diffInMinutes($inCarbon) / 60, 2);



        $status = $inCarbon->format('H:i:s') > '09:00:00' ? 'late' : 'present';


        $intern = Intern::inRandomOrder()->first() ?? Intern::factory();


        $recorder = User::inRandomOrder()->first() ?? User::factory();

        return [
            'intern_id'           => $intern->id,
            'date'                => fake()->dateTimeBetween('-1 month', 'now')->format('Y-m-d'),
            'time_in'             => $timeIn,
            'time_out'            => $timeOut,
            'total_hours'         => max(0, $totalHrs),
            'status'              => $status,
            'remarks'             => fake()->optional(0.2)->sentence(),
            'recorded_by'         => $recorder->id,
            'supervisor_approved' => fake()->boolean(80),


            'is_overridden'       => false,
            'overridden_by'       => null,
            'override_reason'     => null,
            'original_time_in'    => null,
            'original_time_out'   => null,
            'overridden_at'       => null,
            'deleted_at'          => null,
        ];
    }
}
