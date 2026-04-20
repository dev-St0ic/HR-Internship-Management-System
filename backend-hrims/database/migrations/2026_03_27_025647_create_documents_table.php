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
        
        $table->morphs('documentable'); 
        
        $table->foreignId('uploaded_by')->nullable()->constrained('users')->onDelete('restrict');

        $table->enum('document_type', [
            'resume', 'moa', 'nda', 'endorsement_letter', 
            'enrollment_assessment', 'school_id', 'insurance', 
            'coa', 'coc', 'evaluation', 'dtr', 'other'
        ]);

        $table->string('file_name');
        $table->string('file_path');
        $table->string('file_size')->nullable();

        $table->enum('status', ['pending', 'verified', 'rejected'])->default('pending');
        $table->timestamp('verified_at')->nullable();
        $table->foreignId('verified_by')->nullable()->constrained('users')->onDelete('set null');
        $table->date('expiry_date')->nullable();
        
        $table->timestamp('uploaded_at')->useCurrent();
        $table->timestamps();
        $table->softDeletes(); 
    });
}

    public function down(): void
    {
        Schema::dropIfExists('documents');
    }
};