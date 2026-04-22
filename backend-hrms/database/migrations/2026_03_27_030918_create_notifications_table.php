<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('notifications', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->string('title');
            $table->text('message');
            $table->enum('type', [

                'application_submitted',
                'application_approved',
                'application_rejected',

                'dtr_submitted',
                'dtr_approved',
                'dtr_rejected',
                'missing_dtr',
                'dtr_override',

                'task_assigned',
                'task_submitted',
                'task_overdue',
                'task_deadline_reminder',

                'evaluation_due',
                'evaluation_completed',

                'moa_expiring',
                'moa_expired',

                'document_follow_up',

                'general',
            ])->default('general');
            $table->string('action_url')->nullable();
            $table->boolean('is_read')->default(false);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('notifications');
    }
};