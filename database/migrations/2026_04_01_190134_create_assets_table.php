<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('assets', function (Blueprint $table) {
            $table->id();

            $table->foreignId('user_id')->constrained()->onDelete('cascade');

            $table->enum('type', ['jewelry', 'bar', 'coin']);
            $table->string('karat')->nullable();
            $table->string('category')->nullable();
            $table->decimal('weight', 10, 2);
            $table->decimal('purchase_price', 10, 2);
            $table->date('purchase_date')->nullable();
            $table->string('image')->nullable();
            $table->string('currency')->default('JOD');

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('assets');
    }
};
