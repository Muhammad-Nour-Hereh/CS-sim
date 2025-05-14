<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {

    public function up(): void {
        Schema::create('snippets', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete()->cascadeOnUpdate();
            $table->foreignId('chat_history_id')->constrained('chat_histories')->cascadeOnDelete()->cascadeOnUpdate();
            $table->string('title');
            $table->string('language');
            $table->text('code');
            $table->json('history')->default(json_encode([]));
            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down(): void {
        Schema::dropIfExists('snippets');
    }
};
