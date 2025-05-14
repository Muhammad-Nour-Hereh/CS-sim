<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {

    public function up(): void {
        Schema::create('chat_histories', function (Blueprint $table) {
            $table->id();
            $table->json('history')->default(json_encode([]));
            $table->timestamps();
        });
    }

    public function down(): void {
        Schema::dropIfExists('chat_histories');
    }
};
