<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('intern_status_histories', function (Blueprint $table) {
            $table->id();
            $table->foreignId('intern_id')->constrained()->cascadeOnDelete();
            $statuses = ['onboarded', 'active', 'completed', 'failed', 'terminated'];
            $table->enum('old_status', $statuses)->nullable();
            $table->enum('new_status', $statuses);
            $table->enum('status', $statuses);
            $table->foreignId('changed_by')->constrained('users')->onDelete('restrict');
            $table->text('reason')->nullable();
            $table->timestamp('changed_at')->useCurrent();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('intern_status_histories');
    }
};
