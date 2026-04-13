<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('supervisor_intern', function (Blueprint $table) {
            $table->id();
            $table->foreignId('supervisor_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('intern_id')->constrained('interns')->onDelete('cascade');
            $table->timestamp('assigned_at')->useCurrent();
            $table->text('assignment_reason')->nullable();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('supervisor_intern');
    }
};
