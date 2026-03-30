<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('attendance', function (Blueprint $table) {
            $table->id();
            $table->foreignId('intern_id')->constrained('interns')->onDelete('cascade');
            $table->date('date');

            $table->time('time_in')->nullable();
            $table->time('time_out')->nullable();

            $table->integer('break_duration_minutes')->default(0);
            $table->decimal('working_hours', 4, 2)->default(0);

            $table->enum('status', ['on_time', 'late', 'absent', 'pending'])
                ->default('pending');

            $table->boolean('supervisor_approved')->default(false);

            $table->boolean('is_overridden')->default(false);
            $table->foreignId('overridden_by')
                ->nullable()->constrained('users')->onDelete('set null');
            $table->text('override_reason')->nullable();
            $table->time('original_time_in')->nullable();
            $table->time('original_time_out')->nullable();
            $table->timestamp('overridden_at')->nullable();

            $table->timestamps();

            $table->unique(['intern_id', 'date']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('attendance');
    }
};