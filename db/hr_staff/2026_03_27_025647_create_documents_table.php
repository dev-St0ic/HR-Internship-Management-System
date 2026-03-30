<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('documents', function (Blueprint $table) {
            $table->id();
            $table->foreignId('intern_id')->constrained('interns')->onDelete('cascade');
            $table->foreignId('uploaded_by')->constrained('users')->onDelete('restrict');

            $table->enum('document_type', [
                'resume',
                'moa',
                'nda',
                'endorsement_letter',
                'enrollment_assessment',
                'school_id',
                'insurance',
                'coa',
                'coc',
                'evaluation',
                'dtr',
                'other',
            ]);

            $table->string('file_name');
            $table->string('file_path');
            $table->string('file_size')->nullable();

            $table->enum('status', ['pending', 'verified', 'rejected'])->default('pending');

            $table->boolean('follow_up_requested')->default(false);
            $table->text('follow_up_note')->nullable();
            $table->timestamp('follow_up_at')->nullable();
            $table->foreignId('follow_up_by')
                ->nullable()->constrained('users')->onDelete('set null');

            $table->timestamp('uploaded_at')->useCurrent();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('documents');
    }
};