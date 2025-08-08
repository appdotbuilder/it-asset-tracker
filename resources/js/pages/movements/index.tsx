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
    name: string;
    asset_tag: string;
    category: AssetCategory;
}

interface Location {
    id: number;
    name: string;
    city: string;
}

interface User {
    id: number;
    name: string;
}

interface Movement {
    id: number;
    type: string;
    quantity: number;
    purpose: string;
    recipient: string;
    notes: string;
    movement_date: string;
    asset: Asset;
    location: Location;
    user: User;
}

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface Props {
    movements: {
        data: Movement[];
        links: PaginationLink[];
        current_page: number;
        last_page: number;
        total: number;
    };
    [key: string]: unknown;
}

const getTypeColor = (type: string) => {
    return type === 'incoming' 
        ? 'bg-green-100 text-green-700' 
        : 'bg-red-100 text-red-700';
};

const getTypeIcon = (type: string) => {
    return type === 'incoming' ? '📥' : '📤';
};

export default function MovementsIndex({ movements }: Props) {
    return (
        <AppShell>
            <Head title="Asset Movements" />
            
            <div className="space-y-6">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">📋 Asset Movements</h1>
                        <p className="text-gray-600 mt-1">
                            Track all incoming and outgoing asset movements
                        </p>
                    </div>
                    <Link href={route('movements.create')}>
                        <Button>
                            📝 Record New Movement
                        </Button>
                    </Link>
                </div>

                {/* Movements Table */}
                <div className="bg-white shadow rounded-lg">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <h2 className="text-lg font-medium text-gray-900">
                            Movements ({movements.total} total)
                        </h2>
                    </div>
                    
                    {movements.data.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Asset
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Type
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Quantity
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Purpose
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Location
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Date
                                        </th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {movements.data.map((movement) => (
                                        <tr key={movement.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <span className="text-lg mr-3">{movement.asset.category.icon}</span>
                                                    <div>
                                                        <div className="text-sm font-medium text-gray-900">
                                                            {movement.asset.name}
                                                        </div>
                                                        <div className="text-sm text-gray-500">
                                                            #{movement.asset.asset_tag}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${getTypeColor(movement.type)}`}>
                                                    <span className="mr-1">{getTypeIcon(movement.type)}</span>
                                                    {movement.type}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {movement.quantity}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-sm text-gray-900">
                                                    {movement.purpose || 'N/A'}
                                                </div>
                                                {movement.recipient && (
                                                    <div className="text-sm text-gray-500">
                                                        To: {movement.recipient}
                                                    </div>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">
                                                    {movement.location.name}
                                                </div>
                                                <div className="text-sm text-gray-500">
                                                    {movement.location.city}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">
                                                    {new Date(movement.movement_date).toLocaleDateString()}
                                                </div>
                                                <div className="text-sm text-gray-500">
                                                    by {movement.user.name}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <div className="flex justify-end space-x-2">
                                                    <Link 
                                                        href={route('movements.show', movement.id)}
                                                        className="text-indigo-600 hover:text-indigo-900"
                                                    >
                                                        View
                                                    </Link>
                                                    <Link 
                                                        href={route('movements.edit', movement.id)}
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
                            <div className="text-6xl mb-4">📋</div>
                            <h3 className="text-lg font-medium text-gray-900 mb-2">No movements found</h3>
                            <p className="text-gray-500 mb-6">Start tracking by recording your first asset movement.</p>
                            <Link href={route('movements.create')}>
                                <Button>Record Your First Movement</Button>
                            </Link>
                        </div>
                    )}

                    {/* Pagination */}
                    {movements.last_page > 1 && (
                        <div className="px-6 py-4 border-t border-gray-200">
                            <div className="flex items-center justify-between">
                                <div className="text-sm text-gray-500">
                                    Page {movements.current_page} of {movements.last_page}
                                </div>
                                <div className="flex space-x-2">
                                    {movements.links.map((link, index) => (
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