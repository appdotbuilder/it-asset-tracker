<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreAssetRequest;
use App\Http\Requests\UpdateAssetRequest;
use App\Models\Asset;
use App\Models\AssetCategory;
use Inertia\Inertia;

class AssetController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $assets = Asset::with(['category'])
            ->latest()
            ->paginate(10);
        
        return Inertia::render('assets/index', [
            'assets' => $assets
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $categories = AssetCategory::active()->orderBy('name')->get();
        
        return Inertia::render('assets/create', [
            'categories' => $categories
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreAssetRequest $request)
    {
        $asset = Asset::create($request->validated());

        return redirect()->route('assets.show', $asset)
            ->with('success', 'Asset created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Asset $asset)
    {
        $asset->load(['category', 'movements.location', 'movements.user']);
        
        return Inertia::render('assets/show', [
            'asset' => $asset
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Asset $asset)
    {
        $categories = AssetCategory::active()->orderBy('name')->get();
        
        return Inertia::render('assets/edit', [
            'asset' => $asset,
            'categories' => $categories
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateAssetRequest $request, Asset $asset)
    {
        $asset->update($request->validated());

        return redirect()->route('assets.show', $asset)
            ->with('success', 'Asset updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Asset $asset)
    {
        $asset->delete();

        return redirect()->route('assets.index')
            ->with('success', 'Asset deleted successfully.');
    }
}