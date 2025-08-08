<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Asset;
use App\Models\AssetCategory;
use App\Models\AssetMovement;
use App\Models\Location;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Display the dashboard.
     */
    public function index()
    {
        $user = auth()->user();
        $isAdmin = $user->role === 'admin';
        
        // Base query filters for location-specific data
        $locationFilter = function ($query) use ($user, $isAdmin) {
            if (!$isAdmin && $user->location_id) {
                return $query->whereHas('movements', function ($q) use ($user) {
                    $q->where('location_id', $user->location_id);
                });
            }
            return $query;
        };

        // Asset statistics
        $totalAssets = Asset::when(!$isAdmin && $user->location_id, $locationFilter)->count();
        $availableAssets = Asset::where('status', 'available')
            ->when(!$isAdmin && $user->location_id, $locationFilter)
            ->count();
        $inUseAssets = Asset::where('status', 'in_use')
            ->when(!$isAdmin && $user->location_id, $locationFilter)
            ->count();
        $maintenanceAssets = Asset::where('status', 'maintenance')
            ->when(!$isAdmin && $user->location_id, $locationFilter)
            ->count();

        // Recent movements
        $recentMovements = AssetMovement::with(['asset.category', 'location', 'user'])
            ->when(!$isAdmin && $user->location_id, function ($query) use ($user) {
                return $query->where('location_id', $user->location_id);
            })
            ->latest('movement_date')
            ->take(5)
            ->get();

        // Monthly movement statistics
        $monthlyStats = AssetMovement::select(
                DB::raw('strftime("%Y-%m", movement_date) as month'),
                DB::raw('SUM(CASE WHEN type = "incoming" THEN quantity ELSE 0 END) as incoming'),
                DB::raw('SUM(CASE WHEN type = "outgoing" THEN quantity ELSE 0 END) as outgoing')
            )
            ->when(!$isAdmin && $user->location_id, function ($query) use ($user) {
                return $query->where('location_id', $user->location_id);
            })
            ->where('movement_date', '>=', now()->subMonths(6))
            ->groupBy('month')
            ->orderBy('month')
            ->get();

        // Category statistics
        $categoryStats = AssetCategory::withCount(['assets' => $locationFilter])
            ->orderBy('assets_count', 'desc')
            ->take(10)
            ->get();

        return Inertia::render('dashboard', [
            'stats' => [
                'total_assets' => $totalAssets,
                'available_assets' => $availableAssets,
                'in_use_assets' => $inUseAssets,
                'maintenance_assets' => $maintenanceAssets,
            ],
            'recent_movements' => $recentMovements,
            'monthly_stats' => $monthlyStats,
            'category_stats' => $categoryStats,
            'user_location' => $user->location,
            'is_admin' => $isAdmin,
        ]);
    }
}