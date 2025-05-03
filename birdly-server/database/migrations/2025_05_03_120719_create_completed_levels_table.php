<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {

        Schema::create('completed_levels', function (Blueprint $table) {
            $table->primary(['progress_id', 'Level_id']);
            $table->foreignId('progress_id')->constrained('progresses')->cascadeOnDelete();
            $table->foreignId('Level_id')->constrained('levels')->cascadeOnDelete();
        });
    }

    public function down(): void {
        Schema::dropIfExists('completed_levels');
    }
};
