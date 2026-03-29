<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('tasks', function (Blueprint $table) {
            $table->id();
            $table->foreignId('intern_id')->constrained('interns')->onDelete('cascade');
            $table->foreignId('assigned_by')->constrained('users')->onDelete('restrict');
            $table->string('task_title');
            $table->text('description')->nullable();

            $table->enum('priority', ['high', 'moderate', 'low'])->default('moderate');
            $table->date('start_date');
            $table->date('deadline');
            $table->date('finish_date')->nullable();

            $table->string('deliverable_file')->nullable();
            $table->boolean('is_submitted')->default(false);
            $table->timestamp('submitted_at')->nullable();

            $table->boolean('supervisor_notified')->default(false);

            $table->enum('status', ['not_started', 'in_progress', 'completed', 'overdue'])
                ->default('not_started');

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('tasks');
    }
};