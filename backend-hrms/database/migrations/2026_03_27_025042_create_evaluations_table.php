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
            $table->tinyInteger('work_quality')->default(0);
            $table->tinyInteger('communication')->default(0);
            $table->tinyInteger('initiative')->default(0);
            $table->tinyInteger('attendance')->default(0);
            $table->tinyInteger('professionalism')->default(0);
            $table->decimal('total_score', 5, 2)->default(0);
            $table->text('remarks')->nullable();
            $table->date('evaluation_date');
            $table->timestamp('submitted_at')->nullable();
            $table->enum('status', ['draft', 'submitted', 'approved', 'rejected'])
                ->default('draft');
            $table->softDeletes();
            $table->timestamps();
            $table->unique(['intern_id', 'evaluation_date', 'supervisor_id'], 'unique_intern_eval');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('evaluations');
    }
};
