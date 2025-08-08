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
        Schema::create('asset_categories', function (Blueprint $table) {
            $table->id();
            $table->string('name')->comment('Category name');
            $table->string('slug')->unique()->comment('URL-friendly category name');
            $table->text('description')->nullable()->comment('Category description');
            $table->string('icon')->nullable()->comment('Icon identifier');
            $table->boolean('is_active')->default(true)->comment('Whether category is active');
            $table->timestamps();
            
            // Indexes for performance
            $table->index('name');
            $table->index('slug');
            $table->index('is_active');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('asset_categories');
    }
};