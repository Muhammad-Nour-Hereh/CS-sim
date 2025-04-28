<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {

    public function up(): void {
        Schema::disableForeignKeyConstraints();

        Schema::create('snippets', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('user_id');
            $table->foreign('user_id')->references('id')->on('users');
            $table->string('title');
            $table->string('language');
            $table->text('code');
            $table->timestamps();
            $table->softDeletes();
        });

        Schema::enableForeignKeyConstraints();
    }

    public function down(): void {
        Schema::disableForeignKeyConstraints();
        Schema::dropIfExists('snippets');
        Schema::enableForeignKeyConstraints();
    }
};
