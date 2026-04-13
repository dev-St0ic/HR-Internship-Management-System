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
            $table->foreignId('supervisor_id')->constrained('users')->onDelete('restrict');
            $table->string('task_title');
            $table->text('description')->nullable();
            $table->timestamp('deadline');
            $table->timestamp('completed_at')->nullable();
            $table->enum('status', ['pending', 'in_progress', 'completed', 'on_hold', 'cancelled'])
                ->default('pending');
            $table->enum('priority', ['low', 'medium', 'high', 'urgent'])
                ->default('medium');
            $table->softDeletes();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('tasks');
    }
};
