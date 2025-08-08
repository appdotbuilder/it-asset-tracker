<?php

use App\Http\Controllers\AssetController;
use App\Http\Controllers\AssetMovementController;
use App\Http\Controllers\DashboardController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/health-check', function () {
    return response()->json([
        'status' => 'ok',
        'timestamp' => now()->toISOString(),
    ]);
})->name('health-check');

// IT Inventory Management Welcome Page
Route::get('/', function () {
    return Inertia::render('welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
    ]);
})->name('home');

// Dashboard (authenticated users)
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');
    
    // Asset Management Routes
    Route::resource('assets', AssetController::class);
    Route::resource('movements', AssetMovementController::class);
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
