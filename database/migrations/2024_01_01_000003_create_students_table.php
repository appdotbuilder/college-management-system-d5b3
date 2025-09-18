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
        Schema::create('students', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('nric_no')->unique()->comment('Student NRIC/IC number');
            $table->string('matric_no')->comment('Student matriculation number');
            $table->string('program')->comment('Academic program');
            $table->date('intake_date')->comment('Program intake date');
            $table->enum('status', ['active', 'inactive', 'graduated', 'suspended'])->default('active')->comment('Student status');
            $table->string('phone')->nullable()->comment('Contact phone number');
            $table->text('address')->nullable()->comment('Student address');
            $table->string('guardian_name')->nullable()->comment('Guardian/parent name');
            $table->timestamps();
            
            // Indexes for performance
            $table->index('user_id');
            $table->index('nric_no');
            $table->index('matric_no');
            $table->index('program');
            $table->index('status');
            $table->index(['status', 'intake_date']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('students');
    }
};