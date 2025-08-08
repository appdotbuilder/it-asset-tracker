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
        Schema::create('locations', function (Blueprint $table) {
            $table->id();
            $table->string('name')->comment('Office location name');
            $table->string('code', 10)->unique()->comment('Short code for the location');
            $table->string('address')->nullable()->comment('Physical address');
            $table->string('city', 100)->comment('City name');
            $table->string('country', 100)->default('Indonesia')->comment('Country');
            $table->boolean('is_active')->default(true)->comment('Whether location is active');
            $table->timestamps();
            
            // Indexes for performance
            $table->index('name');
            $table->index('code');
            $table->index(['is_active', 'city']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('locations');
    }
};