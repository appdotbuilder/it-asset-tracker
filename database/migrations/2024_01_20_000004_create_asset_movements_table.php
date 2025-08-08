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
        Schema::create('asset_movements', function (Blueprint $table) {
            $table->id();
            $table->foreignId('asset_id')->constrained()->onDelete('cascade');
            $table->foreignId('location_id')->constrained();
            $table->foreignId('user_id')->constrained();
            $table->enum('type', ['incoming', 'outgoing'])->comment('Movement type');
            $table->integer('quantity')->default(1)->comment('Quantity moved');
            $table->text('purpose')->nullable()->comment('Purpose/reason for movement');
            $table->string('recipient')->nullable()->comment('Person/department receiving asset');
            $table->text('notes')->nullable()->comment('Additional notes');
            $table->timestamp('movement_date')->comment('Date of movement');
            $table->timestamps();
            
            // Indexes for performance
            $table->index('type');
            $table->index('movement_date');
            $table->index(['asset_id', 'type']);
            $table->index(['location_id', 'type']);
            $table->index(['movement_date', 'type']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('asset_movements');
    }
};