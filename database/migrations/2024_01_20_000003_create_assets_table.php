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
        Schema::create('assets', function (Blueprint $table) {
            $table->id();
            $table->string('asset_tag')->unique()->comment('Unique asset identifier');
            $table->string('name')->comment('Asset name/title');
            $table->foreignId('asset_category_id')->constrained();
            $table->string('brand')->nullable()->comment('Brand/manufacturer');
            $table->string('model')->nullable()->comment('Model number');
            $table->string('serial_number')->nullable()->comment('Serial number');
            $table->date('purchase_date')->nullable()->comment('Date of purchase');
            $table->decimal('purchase_price', 12, 2)->nullable()->comment('Purchase price');
            $table->enum('condition', ['excellent', 'good', 'fair', 'poor', 'damaged'])->default('good')->comment('Current condition');
            $table->text('description')->nullable()->comment('Additional details');
            $table->string('warranty_until')->nullable()->comment('Warranty expiration');
            $table->enum('status', ['available', 'in_use', 'maintenance', 'disposed'])->default('available')->comment('Current status');
            $table->timestamps();
            
            // Indexes for performance
            $table->index('asset_tag');
            $table->index('name');
            $table->index('status');
            $table->index('condition');
            $table->index(['asset_category_id', 'status']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('assets');
    }
};