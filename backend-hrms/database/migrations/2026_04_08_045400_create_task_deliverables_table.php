<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('task_deliverables', function (Blueprint $table) {
            $table->id();
            $table->foreignId('task_id')->constrained('tasks')->onDelete('cascade');
            $table->string('file_path');
            $table->foreignId('uploaded_by')->constrained('users');
            $table->timestamp('uploaded_at')->useCurrent();
            $table->text('feedback')->nullable();
            $table->timestamp('feedback_given_at')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('task_deliverables');
    }
};
