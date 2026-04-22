<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('applications', function (Blueprint $table) {
            $table->id();
            $table->string('first_name');
            $table->string('last_name');
            $table->string('email')->unique();
            $table->string('mobile_number');
            $table->date('date_of_birth')->nullable();
            $table->enum('gender', ['male', 'female'])->nullable();
            $table->string('nationality')->nullable();
            $table->string('address')->nullable();
            $table->string('city')->nullable();
            $table->string('zip_code')->nullable();
            $table->string('university')->nullable();
            $table->string('program')->nullable();
            $table->string('year_level')->nullable();
            $table->integer('required_hours')->default(200);
            $table->date('expected_graduation')->nullable();
            $table->string('preferred_department')->nullable();
            $table->string('resume_file')->nullable();
            $table->string('moa_file')->nullable();
            $table->string('endorsement_file')->nullable();
            $table->string('enrollment_assessment_file')->nullable();
            $table->string('school_id_file')->nullable();
            $table->string('insurance_file')->nullable();
            $table->enum('status', ['pending', 'hr_review', 'for_admin_approval', 'approved', 'rejected'])->default('pending');
            $table->text('remarks')->nullable();
            $table->foreignId('reviewed_by')->nullable()->constrained('users')->onDelete('set null');
            $table->foreignId('approved_by')->nullable()->constrained('users')->onDelete('set null');
            $table->foreignId('assigned_department_id')->nullable()->constrained('departments')->onDelete('set null');
            $table->foreignId('assigned_supervisor_id')->nullable()->constrained('users')->onDelete('set null');
            $table->timestamp('deployed_at')->nullable();
            $table->timestamp('submitted_at')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('applications');
    }
};
