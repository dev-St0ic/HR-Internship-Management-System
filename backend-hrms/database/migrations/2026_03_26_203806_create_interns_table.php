<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('interns', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('application_id')
                ->nullable()->constrained('applications')->onDelete('set null');
            $table->foreignId('university_id')->constrained('universities')->onDelete('restrict');
            $table->foreignId('department_id')->constrained('departments')->onDelete('restrict');
            $table->foreignId('supervisor_id')->constrained('users')->onDelete('restrict');
            $table->string('first_name');
            $table->string('last_name');
            $table->string('mobile_number')->nullable();
            $table->date('date_of_birth')->nullable();
            $table->enum('gender', ['male', 'female', 'other'])->nullable();
            $table->string('address')->nullable();
            $table->string('city')->nullable();
            $table->string('zip_code', 10)->nullable();
            $table->string('nationality')->nullable();
            $table->enum('marital_status', ['single', 'married', 'widowed', 'separated'])->nullable();
            $table->string('course');
            $table->string('year_level')->nullable();
            $table->integer('required_hours');
            $table->date('expected_graduation')->nullable();
            $table->decimal('completed_hours', 6, 2)->default(0);
            $table->decimal('hours_today', 4, 2)->default(0);
            $table->timestamp('hours_last_computed_at')->nullable();
            $table->date('start_date');
            $table->date('end_date');
            $table->enum('status', ['active', 'completed', 'dropped', 'rejected'])->default('active');
            $table->text('rejection_reason')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }
    public function down(): void
    {
        Schema::dropIfExists('interns');
    }
};
