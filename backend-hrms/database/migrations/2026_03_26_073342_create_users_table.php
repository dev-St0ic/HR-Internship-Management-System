<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->string('phone')->nullable();

            // Reference Roles (Ensure Role migration exists and runs before this!)
            $table->foreignId('role_id')->constrained('roles');

            // Define the column, but don't link it yet
            $table->unsignedBigInteger('department_id')->nullable();

            $table->integer('max_interns')->default(5);
            $table->integer('status')->default(1);
            $table->rememberToken();
            $table->softDeletes();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
