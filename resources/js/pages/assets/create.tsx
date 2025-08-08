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

interface Props {
    categories: AssetCategory[];
    [key: string]: unknown;
}

interface AssetFormData {
    asset_tag: string;
    name: string;
    asset_category_id: string;
    brand: string;
    model: string;
    serial_number: string;
    purchase_date: string;
    purchase_price: string;
    condition: string;
    description: string;
    warranty_until: string;
    status: string;
    [key: string]: string;
}

export default function CreateAsset({ categories }: Props) {
    const { data, setData, post, processing, errors } = useForm<AssetFormData>({
        asset_tag: '',
        name: '',
        asset_category_id: '',
        brand: '',
        model: '',
        serial_number: '',
        purchase_date: '',
        purchase_price: '',
        condition: 'good',
        description: '',
        warranty_until: '',
        status: 'available',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('assets.store'));
    };

    return (
        <AppShell>
            <Head title="Add New Asset" />
            
            <div className="space-y-6">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">➕ Add New Asset</h1>
                        <p className="text-gray-600 mt-1">
                            Add a new IT asset to the inventory
                        </p>
                    </div>
                    <Link href={route('assets.index')}>
                        <Button variant="outline">
                            ← Back to Assets
                        </Button>
                    </Link>
                </div>

                {/* Form */}
                <div className="bg-white shadow rounded-lg">
                    <form onSubmit={handleSubmit} className="space-y-6 p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Asset Tag */}
                            <div>
                                <label htmlFor="asset_tag" className="block text-sm font-medium text-gray-700 mb-2">
                                    Asset Tag *
                                </label>
                                <input
                                    type="text"
                                    id="asset_tag"
                                    value={data.asset_tag}
                                    onChange={(e) => setData('asset_tag', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                    placeholder="e.g., AST-001234"
                                />
                                <InputError message={errors.asset_tag} />
                            </div>

                            {/* Asset Name */}
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                    Asset Name *
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                    placeholder="e.g., Dell Latitude 5520"
                                />
                                <InputError message={errors.name} />
                            </div>

                            {/* Category */}
                            <div>
                                <label htmlFor="asset_category_id" className="block text-sm font-medium text-gray-700 mb-2">
                                    Category *
                                </label>
                                <select
                                    id="asset_category_id"
                                    value={data.asset_category_id}
                                    onChange={(e) => setData('asset_category_id', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                >
                                    <option value="">Select a category</option>
                                    {categories.map((category) => (
                                        <option key={category.id} value={category.id}>
                                            {category.icon} {category.name}
                                        </option>
                                    ))}
                                </select>
                                <InputError message={errors.asset_category_id} />
                            </div>

                            {/* Brand */}
                            <div>
                                <label htmlFor="brand" className="block text-sm font-medium text-gray-700 mb-2">
                                    Brand
                                </label>
                                <input
                                    type="text"
                                    id="brand"
                                    value={data.brand}
                                    onChange={(e) => setData('brand', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                    placeholder="e.g., Dell, HP, Lenovo"
                                />
                                <InputError message={errors.brand} />
                            </div>

                            {/* Model */}
                            <div>
                                <label htmlFor="model" className="block text-sm font-medium text-gray-700 mb-2">
                                    Model
                                </label>
                                <input
                                    type="text"
                                    id="model"
                                    value={data.model}
                                    onChange={(e) => setData('model', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                    placeholder="e.g., Latitude 5520"
                                />
                                <InputError message={errors.model} />
                            </div>

                            {/* Serial Number */}
                            <div>
                                <label htmlFor="serial_number" className="block text-sm font-medium text-gray-700 mb-2">
                                    Serial Number
                                </label>
                                <input
                                    type="text"
                                    id="serial_number"
                                    value={data.serial_number}
                                    onChange={(e) => setData('serial_number', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                    placeholder="e.g., SN123456789"
                                />
                                <InputError message={errors.serial_number} />
                            </div>

                            {/* Purchase Date */}
                            <div>
                                <label htmlFor="purchase_date" className="block text-sm font-medium text-gray-700 mb-2">
                                    Purchase Date
                                </label>
                                <input
                                    type="date"
                                    id="purchase_date"
                                    value={data.purchase_date}
                                    onChange={(e) => setData('purchase_date', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                />
                                <InputError message={errors.purchase_date} />
                            </div>

                            {/* Purchase Price */}
                            <div>
                                <label htmlFor="purchase_price" className="block text-sm font-medium text-gray-700 mb-2">
                                    Purchase Price (IDR)
                                </label>
                                <input
                                    type="number"
                                    id="purchase_price"
                                    value={data.purchase_price}
                                    onChange={(e) => setData('purchase_price', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                    placeholder="e.g., 15000000"
                                    min="0"
                                    step="0.01"
                                />
                                <InputError message={errors.purchase_price} />
                            </div>

                            {/* Condition */}
                            <div>
                                <label htmlFor="condition" className="block text-sm font-medium text-gray-700 mb-2">
                                    Condition *
                                </label>
                                <select
                                    id="condition"
                                    value={data.condition}
                                    onChange={(e) => setData('condition', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                >
                                    <option value="excellent">Excellent</option>
                                    <option value="good">Good</option>
                                    <option value="fair">Fair</option>
                                    <option value="poor">Poor</option>
                                    <option value="damaged">Damaged</option>
                                </select>
                                <InputError message={errors.condition} />
                            </div>

                            {/* Status */}
                            <div>
                                <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
                                    Status *
                                </label>
                                <select
                                    id="status"
                                    value={data.status}
                                    onChange={(e) => setData('status', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                >
                                    <option value="available">Available</option>
                                    <option value="in_use">In Use</option>
                                    <option value="maintenance">Maintenance</option>
                                    <option value="disposed">Disposed</option>
                                </select>
                                <InputError message={errors.status} />
                            </div>

                            {/* Warranty Until */}
                            <div>
                                <label htmlFor="warranty_until" className="block text-sm font-medium text-gray-700 mb-2">
                                    Warranty Until
                                </label>
                                <input
                                    type="text"
                                    id="warranty_until"
                                    value={data.warranty_until}
                                    onChange={(e) => setData('warranty_until', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                    placeholder="e.g., December 2025 or 3 years"
                                />
                                <InputError message={errors.warranty_until} />
                            </div>
                        </div>

                        {/* Description */}
                        <div>
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                                Description
                            </label>
                            <textarea
                                id="description"
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                rows={4}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                placeholder="Additional details about the asset..."
                            />
                            <InputError message={errors.description} />
                        </div>

                        {/* Form Actions */}
                        <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
                            <Link href={route('assets.index')}>
                                <Button variant="outline" type="button">
                                    Cancel
                                </Button>
                            </Link>
                            <Button type="submit" disabled={processing}>
                                {processing ? 'Creating...' : '✅ Create Asset'}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </AppShell>
    );
}