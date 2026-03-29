<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('evaluations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('intern_id')->constrained('interns')->onDelete('cascade');
            $table->foreignId('supervisor_id')->constrained('users')->onDelete('restrict');

            $table->tinyInteger('month');
            $table->smallInteger('year');

            $table->tinyInteger('work_quality');
            $table->tinyInteger('communication');
            $table->tinyInteger('initiative');
            $table->tinyInteger('attendance');
            $table->tinyInteger('professionalism');

            $table->decimal('total_score', 4, 2)->storedAs(
                'work_quality + communication + initiative + attendance + professionalism'
            );

            $table->text('supervisor_comments')->nullable();
            $table->enum('status', ['pending', 'completed'])->default('pending');
            $table->timestamps();

            $table->unique(['intern_id', 'month', 'year']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('evaluations');
    }
};