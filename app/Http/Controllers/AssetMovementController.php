<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreAssetMovementRequest;
use App\Models\Asset;
use App\Models\AssetMovement;
use Inertia\Inertia;

class AssetMovementController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = auth()->user();
        
        $movements = AssetMovement::with(['asset.category', 'location', 'user'])
            ->when($user->role === 'it_staff', function ($query) use ($user) {
                return $query->where('location_id', $user->location_id);
            })
            ->latest('movement_date')
            ->paginate(10);
        
        return Inertia::render('movements/index', [
            'movements' => $movements
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $assets = Asset::with('category')->orderBy('name')->get();
        
        return Inertia::render('movements/create', [
            'assets' => $assets
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreAssetMovementRequest $request)
    {
        $user = auth()->user();
        
        $movement = AssetMovement::create([
            ...$request->validated(),
            'location_id' => $user->location_id,
            'user_id' => $user->id,
        ]);

        return redirect()->route('movements.show', $movement)
            ->with('success', 'Asset movement recorded successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(AssetMovement $movement)
    {
        $movement->load(['asset.category', 'location', 'user']);
        
        return Inertia::render('movements/show', [
            'movement' => $movement
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(AssetMovement $movement)
    {
        $assets = Asset::with('category')->orderBy('name')->get();
        
        return Inertia::render('movements/edit', [
            'movement' => $movement,
            'assets' => $assets
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(StoreAssetMovementRequest $request, AssetMovement $movement)
    {
        $movement->update($request->validated());

        return redirect()->route('movements.show', $movement)
            ->with('success', 'Asset movement updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(AssetMovement $movement)
    {
        $movement->delete();

        return redirect()->route('movements.index')
            ->with('success', 'Asset movement deleted successfully.');
    }
}