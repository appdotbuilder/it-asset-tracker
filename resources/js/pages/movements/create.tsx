import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import InputError from '@/components/input-error';

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

interface Props {
    assets: Asset[];
    [key: string]: unknown;
}

interface MovementFormData {
    asset_id: string;
    type: string;
    quantity: string;
    purpose: string;
    recipient: string;
    notes: string;
    movement_date: string;
    [key: string]: string;
}

export default function CreateMovement({ assets }: Props) {
    const { data, setData, post, processing, errors } = useForm<MovementFormData>({
        asset_id: '',
        type: 'incoming',
        quantity: '1',
        purpose: '',
        recipient: '',
        notes: '',
        movement_date: new Date().toISOString().split('T')[0],
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('movements.store'));
    };

    return (
        <AppShell>
            <Head title="Record Asset Movement" />
            
            <div className="space-y-6">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">📝 Record Asset Movement</h1>
                        <p className="text-gray-600 mt-1">
                            Track incoming or outgoing asset movements
                        </p>
                    </div>
                    <Link href={route('movements.index')}>
                        <Button variant="outline">
                            ← Back to Movements
                        </Button>
                    </Link>
                </div>

                {/* Form */}
                <div className="bg-white shadow rounded-lg">
                    <form onSubmit={handleSubmit} className="space-y-6 p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Asset */}
                            <div className="md:col-span-2">
                                <label htmlFor="asset_id" className="block text-sm font-medium text-gray-700 mb-2">
                                    Asset *
                                </label>
                                <select
                                    id="asset_id"
                                    value={data.asset_id}
                                    onChange={(e) => setData('asset_id', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                >
                                    <option value="">Select an asset</option>
                                    {assets.map((asset) => (
                                        <option key={asset.id} value={asset.id}>
                                            {asset.category.icon} {asset.name} (#{asset.asset_tag})
                                        </option>
                                    ))}
                                </select>
                                <InputError message={errors.asset_id} />
                            </div>

                            {/* Movement Type */}
                            <div>
                                <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-2">
                                    Movement Type *
                                </label>
                                <select
                                    id="type"
                                    value={data.type}
                                    onChange={(e) => setData('type', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                >
                                    <option value="incoming">📥 Incoming</option>
                                    <option value="outgoing">📤 Outgoing</option>
                                </select>
                                <InputError message={errors.type} />
                            </div>

                            {/* Quantity */}
                            <div>
                                <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-2">
                                    Quantity *
                                </label>
                                <input
                                    type="number"
                                    id="quantity"
                                    value={data.quantity}
                                    onChange={(e) => setData('quantity', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                    min="1"
                                />
                                <InputError message={errors.quantity} />
                            </div>

                            {/* Movement Date */}
                            <div>
                                <label htmlFor="movement_date" className="block text-sm font-medium text-gray-700 mb-2">
                                    Movement Date *
                                </label>
                                <input
                                    type="date"
                                    id="movement_date"
                                    value={data.movement_date}
                                    onChange={(e) => setData('movement_date', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                />
                                <InputError message={errors.movement_date} />
                            </div>

                            {/* Recipient */}
                            <div>
                                <label htmlFor="recipient" className="block text-sm font-medium text-gray-700 mb-2">
                                    Recipient / Department
                                </label>
                                <input
                                    type="text"
                                    id="recipient"
                                    value={data.recipient}
                                    onChange={(e) => setData('recipient', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                    placeholder="e.g., John Doe, IT Department"
                                />
                                <InputError message={errors.recipient} />
                            </div>
                        </div>

                        {/* Purpose */}
                        <div>
                            <label htmlFor="purpose" className="block text-sm font-medium text-gray-700 mb-2">
                                Purpose / Reason
                            </label>
                            <input
                                type="text"
                                id="purpose"
                                value={data.purpose}
                                onChange={(e) => setData('purpose', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                placeholder="e.g., New employee setup, Replacement, Maintenance"
                            />
                            <InputError message={errors.purpose} />
                        </div>

                        {/* Notes */}
                        <div>
                            <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-2">
                                Additional Notes
                            </label>
                            <textarea
                                id="notes"
                                value={data.notes}
                                onChange={(e) => setData('notes', e.target.value)}
                                rows={4}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                placeholder="Any additional information about this movement..."
                            />
                            <InputError message={errors.notes} />
                        </div>

                        {/* Movement Type Information */}
                        <div className={`p-4 rounded-lg border ${
                            data.type === 'incoming' 
                                ? 'bg-green-50 border-green-200' 
                                : 'bg-red-50 border-red-200'
                        }`}>
                            <div className="flex items-center">
                                <span className="text-lg mr-2">
                                    {data.type === 'incoming' ? '📥' : '📤'}
                                </span>
                                <div>
                                    <h4 className="font-medium text-gray-900">
                                        {data.type === 'incoming' ? 'Incoming Movement' : 'Outgoing Movement'}
                                    </h4>
                                    <p className="text-sm text-gray-600">
                                        {data.type === 'incoming' 
                                            ? 'Recording assets coming into your location (purchases, transfers in, returns)' 
                                            : 'Recording assets leaving your location (deployments, transfers out, disposal)'
                                        }
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Form Actions */}
                        <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
                            <Link href={route('movements.index')}>
                                <Button variant="outline" type="button">
                                    Cancel
                                </Button>
                            </Link>
                            <Button type="submit" disabled={processing}>
                                {processing ? 'Recording...' : '✅ Record Movement'}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </AppShell>
    );
}