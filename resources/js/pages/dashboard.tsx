import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';

interface Asset {
    id: number;
    name: string;
    asset_tag: string;
    category: {
        name: string;
        icon: string;
    };
}

interface Movement {
    id: number;
    type: string;
    quantity: number;
    movement_date: string;
    asset: Asset;
    location: {
        name: string;
    };
    user: {
        name: string;
    };
}

interface MonthlyStats {
    month: string;
    incoming: number;
    outgoing: number;
}

interface CategoryStats {
    id: number;
    name: string;
    icon: string;
    assets_count: number;
}

interface Location {
    id: number;
    name: string;
    city: string;
}

interface Props {
    stats: {
        total_assets: number;
        available_assets: number;
        in_use_assets: number;
        maintenance_assets: number;
    };
    recent_movements: Movement[];
    monthly_stats: MonthlyStats[];
    category_stats: CategoryStats[];
    user_location: Location;
    is_admin: boolean;
    [key: string]: unknown;
}

export default function Dashboard({ 
    stats, 
    recent_movements, 
    monthly_stats, 
    category_stats, 
    user_location,
    is_admin 
}: Props) {
    return (
        <AppShell>
            <Head title="Dashboard" />
            
            <div className="space-y-6">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">
                            🏢 IT Asset Dashboard
                        </h1>
                        <p className="text-gray-600 mt-1">
                            {is_admin ? 'System Overview' : `${user_location.name} - ${user_location.city}`}
                        </p>
                    </div>
                    <div className="flex gap-3">
                        <Link href={route('assets.create')}>
                            <Button>
                                ➕ Add Asset
                            </Button>
                        </Link>
                        <Link href={route('movements.create')}>
                            <Button variant="outline">
                                📝 Record Movement
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex items-center">
                            <div className="p-2 bg-blue-100 rounded-lg">
                                <span className="text-xl">📦</span>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">Total Assets</p>
                                <p className="text-2xl font-semibold text-gray-900">{stats.total_assets}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex items-center">
                            <div className="p-2 bg-green-100 rounded-lg">
                                <span className="text-xl">✅</span>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">Available</p>
                                <p className="text-2xl font-semibold text-green-600">{stats.available_assets}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex items-center">
                            <div className="p-2 bg-orange-100 rounded-lg">
                                <span className="text-xl">🔄</span>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">In Use</p>
                                <p className="text-2xl font-semibold text-orange-600">{stats.in_use_assets}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex items-center">
                            <div className="p-2 bg-red-100 rounded-lg">
                                <span className="text-xl">🔧</span>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">Maintenance</p>
                                <p className="text-2xl font-semibold text-red-600">{stats.maintenance_assets}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Recent Movements */}
                    <div className="bg-white rounded-lg shadow">
                        <div className="p-6 border-b border-gray-200">
                            <div className="flex justify-between items-center">
                                <h2 className="text-lg font-semibold text-gray-900">📋 Recent Movements</h2>
                                <Link href={route('movements.index')}>
                                    <Button variant="outline" size="sm">View All</Button>
                                </Link>
                            </div>
                        </div>
                        <div className="p-6">
                            {recent_movements.length > 0 ? (
                                <div className="space-y-4">
                                    {recent_movements.map((movement) => (
                                        <div key={movement.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                                            <div className="flex items-center">
                                                <div className={`p-1 rounded text-sm ${
                                                    movement.type === 'incoming' 
                                                        ? 'bg-green-100 text-green-700'
                                                        : 'bg-red-100 text-red-700'
                                                }`}>
                                                    {movement.type === 'incoming' ? '📥' : '📤'}
                                                </div>
                                                <div className="ml-3">
                                                    <p className="text-sm font-medium text-gray-900">
                                                        {movement.asset.category.icon} {movement.asset.name}
                                                    </p>
                                                    <p className="text-xs text-gray-500">
                                                        {movement.location.name} • {movement.user.name}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-sm text-gray-900">Qty: {movement.quantity}</p>
                                                <p className="text-xs text-gray-500">
                                                    {new Date(movement.movement_date).toLocaleDateString()}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-500 text-center py-8">No recent movements</p>
                            )}
                        </div>
                    </div>

                    {/* Category Statistics */}
                    <div className="bg-white rounded-lg shadow">
                        <div className="p-6 border-b border-gray-200">
                            <div className="flex justify-between items-center">
                                <h2 className="text-lg font-semibold text-gray-900">📊 Assets by Category</h2>
                                <Link href={route('assets.index')}>
                                    <Button variant="outline" size="sm">View Assets</Button>
                                </Link>
                            </div>
                        </div>
                        <div className="p-6">
                            {category_stats.length > 0 ? (
                                <div className="space-y-4">
                                    {category_stats.slice(0, 6).map((category) => (
                                        <div key={category.id} className="flex items-center justify-between">
                                            <div className="flex items-center">
                                                <span className="text-lg mr-3">{category.icon}</span>
                                                <span className="text-sm font-medium text-gray-900">
                                                    {category.name}
                                                </span>
                                            </div>
                                            <span className="text-sm font-semibold text-gray-900">
                                                {category.assets_count}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-500 text-center py-8">No categories found</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Monthly Movement Chart */}
                {monthly_stats.length > 0 && (
                    <div className="bg-white rounded-lg shadow">
                        <div className="p-6 border-b border-gray-200">
                            <h2 className="text-lg font-semibold text-gray-900">📈 Monthly Movement Trends</h2>
                        </div>
                        <div className="p-6">
                            <div className="space-y-4">
                                {monthly_stats.map((stat) => (
                                    <div key={stat.month} className="flex items-center justify-between">
                                        <div className="text-sm font-medium text-gray-900">
                                            {new Date(stat.month + '-01').toLocaleDateString('en-US', { 
                                                year: 'numeric', 
                                                month: 'long' 
                                            })}
                                        </div>
                                        <div className="flex items-center space-x-4">
                                            <div className="flex items-center">
                                                <span className="text-green-600 mr-1">📥</span>
                                                <span className="text-sm text-green-600">{stat.incoming}</span>
                                            </div>
                                            <div className="flex items-center">
                                                <span className="text-red-600 mr-1">📤</span>
                                                <span className="text-sm text-red-600">{stat.outgoing}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Quick Actions */}
                <div className="bg-white rounded-lg shadow">
                    <div className="p-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">🚀 Quick Actions</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <Link href={route('assets.index')} className="flex flex-col items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                                <span className="text-2xl mb-2">📦</span>
                                <span className="text-sm font-medium text-center">View All Assets</span>
                            </Link>
                            
                            <Link href={route('movements.index')} className="flex flex-col items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                                <span className="text-2xl mb-2">📋</span>
                                <span className="text-sm font-medium text-center">Movement History</span>
                            </Link>
                            
                            <Link href={route('assets.create')} className="flex flex-col items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                                <span className="text-2xl mb-2">➕</span>
                                <span className="text-sm font-medium text-center">Add New Asset</span>
                            </Link>
                            
                            <Link href={route('movements.create')} className="flex flex-col items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                                <span className="text-2xl mb-2">📝</span>
                                <span className="text-sm font-medium text-center">Record Movement</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </AppShell>
    );
}