<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('user_settings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->enum('theme', ['light', 'dark', 'system'])->default('light');
            $table->string('language', 10)->default('en');
            $table->boolean('two_factor_enabled')->default(false);
            $table->boolean('mobile_push_notifications')->default(true);
            $table->boolean('desktop_notifications')->default(true);
            $table->boolean('email_notifications')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('user_settings');
    }
};
