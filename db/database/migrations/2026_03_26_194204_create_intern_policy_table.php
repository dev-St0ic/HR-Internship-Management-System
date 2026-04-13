<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('intern_policy', function (Blueprint $table) {
            $table->id();
            $table->integer('grace_period_minutes')->default(15);
            $table->time('work_start_time')->default('09:00:00');
            $table->time('work_end_time')->default('18:00:00');
            $table->integer('required_working_hours_per_day')->default(8);
            $table->integer('moa_expiry_alert_days')->default(30);
            $table->boolean('allow_mobile_timein')->default(false);
            $table->boolean('require_dtr_approval')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('intern_policy');
    }
};