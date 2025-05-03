<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {

    public function up(): void {

        Schema::create('mistakes', function (Blueprint $table) {
            $table->primary(['progress_id', 'questions_id']);
            $table->foreignId('progress_id')->constrained('progresses')->cascadeOnDelete();
            $table->foreignId('questions_id')->constrained('questions')->cascadeOnDelete();
            $table->integer('count');
        });
    }

    public function down(): void {
        Schema::dropIfExists('mistakes');
    }
};
