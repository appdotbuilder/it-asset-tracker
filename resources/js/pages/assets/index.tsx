import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';

interface AssetCategory {
    id: number;
    name: string;
    icon: string;
}

interface Asset {
    id: number;
    asset_tag: string;
    name: string;
    brand: string;
    model: string;
    condition: string;
    status: string;
    purchase_date: string;
    category: AssetCategory;
}

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface Props {
    assets: {
        data: Asset[];
        links: PaginationLink[];
        current_page: number;
        last_page: number;
        total: number;
    };
    [key: string]: unknown;
}

const getStatusColor = (status: string) => {
    switch (status) {
        case 'available':
            return 'bg-green-100 text-green-700';
        case 'in_use':
            return 'bg-blue-100 text-blue-700';
        case 'maintenance':
            return 'bg-orange-100 text-orange-700';
        case 'disposed':
            return 'bg-gray-100 text-gray-700';
        default:
            return 'bg-gray-100 text-gray-700';
    }
};

const getConditionColor = (condition: string) => {
    switch (condition) {
        case 'excellent':
            return 'bg-green-100 text-green-700';
        case 'good':
            return 'bg-blue-100 text-blue-700';
        case 'fair':
            return 'bg-yellow-100 text-yellow-700';
        case 'poor':
            return 'bg-orange-100 text-orange-700';
        case 'damaged':
            return 'bg-red-100 text-red-700';
        default:
            return 'bg-gray-100 text-gray-700';
    }
};

export default function AssetsIndex({ assets }: Props) {
    return (
        <AppShell>
            <Head title="Assets" />
            
            <div className="space-y-6">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">📦 IT Assets</h1>
                        <p className="text-gray-600 mt-1">
                            Manage all IT assets and equipment
                        </p>
                    </div>
                    <Link href={route('assets.create')}>
                        <Button>
                            ➕ Add New Asset
                        </Button>
                    </Link>
                </div>

                {/* Assets Table */}
                <div className="bg-white shadow rounded-lg">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <h2 className="text-lg font-medium text-gray-900">
                            Assets ({assets.total} total)
                        </h2>
                    </div>
                    
                    {assets.data.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Asset
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Category
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Brand/Model
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Status
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Condition
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Purchase Date
                                        </th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {assets.data.map((asset) => (
                                        <tr key={asset.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div>
                                                    <div className="text-sm font-medium text-gray-900">
                                                        {asset.name}
                                                    </div>
                                                    <div className="text-sm text-gray-500">
                                                        #{asset.asset_tag}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <span className="text-lg mr-2">{asset.category.icon}</span>
                                                    <span className="text-sm text-gray-900">{asset.category.name}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">
                                                    {asset.brand}
                                                </div>
                                                <div className="text-sm text-gray-500">
                                                    {asset.model}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(asset.status)}`}>
                                                    {asset.status.replace('_', ' ')}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getConditionColor(asset.condition)}`}>
                                                    {asset.condition}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {asset.purchase_date ? 
                                                    new Date(asset.purchase_date).toLocaleDateString() 
                                                    : 'N/A'
                                                }
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <div className="flex justify-end space-x-2">
                                                    <Link 
                                                        href={route('assets.show', asset.id)}
                                                        className="text-indigo-600 hover:text-indigo-900"
                                                    >
                                                        View
                                                    </Link>
                                                    <Link 
                                                        href={route('assets.edit', asset.id)}
                                                        className="text-green-600 hover:text-green-900"
                                                    >
                                                        Edit
                                                    </Link>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <div className="text-6xl mb-4">📦</div>
                            <h3 className="text-lg font-medium text-gray-900 mb-2">No assets found</h3>
                            <p className="text-gray-500 mb-6">Get started by adding your first IT asset.</p>
                            <Link href={route('assets.create')}>
                                <Button>Add Your First Asset</Button>
                            </Link>
                        </div>
                    )}

                    {/* Pagination */}
                    {assets.last_page > 1 && (
                        <div className="px-6 py-4 border-t border-gray-200">
                            <div className="flex items-center justify-between">
                                <div className="text-sm text-gray-500">
                                    Page {assets.current_page} of {assets.last_page}
                                </div>
                                <div className="flex space-x-2">
                                    {assets.links.map((link, index) => (
                                        link.url ? (
                                            <Link
                                                key={index}
                                                href={link.url}
                                                className={`px-3 py-1 text-sm rounded ${
                                                    link.active
                                                        ? 'bg-indigo-600 text-white'
                                                        : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                                                }`}
                                                dangerouslySetInnerHTML={{ __html: link.label }}
                                            />
                                        ) : (
                                            <span
                                                key={index}
                                                className="px-3 py-1 text-sm text-gray-400 cursor-not-allowed"
                                                dangerouslySetInnerHTML={{ __html: link.label }}
                                            />
                                        )
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AppShell>
    );
}