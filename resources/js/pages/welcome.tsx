import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';

interface Props {
    canLogin: boolean;
    canRegister: boolean;
    [key: string]: unknown;
}

export default function Welcome({ canLogin, canRegister }: Props) {
    return (
        <>
            <Head title="IT Inventory Management System" />
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
                {/* Header */}
                <header className="relative z-10 px-6 py-4">
                    <div className="mx-auto max-w-7xl flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <div className="h-10 w-10 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
                                <span className="text-xl font-bold text-white">IT</span>
                            </div>
                            <span className="text-xl font-bold text-gray-900">Inventory System</span>
                        </div>
                        
                        {canLogin && (
                            <nav className="space-x-4">
                                <Link
                                    href={route('login')}
                                    className="font-semibold text-gray-600 hover:text-gray-900 transition-colors"
                                >
                                    Log in
                                </Link>
                                {canRegister && (
                                    <Link href={route('register')}>
                                        <Button>Register</Button>
                                    </Link>
                                )}
                            </nav>
                        )}
                    </div>
                </header>

                {/* Hero Section */}
                <main className="relative px-6 py-20">
                    <div className="mx-auto max-w-7xl">
                        <div className="text-center">
                            <h1 className="text-6xl font-bold text-gray-900 mb-6">
                                🖥️ IT Asset Management
                            </h1>
                            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                                Streamline your IT inventory with our comprehensive asset tracking system. 
                                Manage assets across multiple office locations with real-time reporting and analytics.
                            </p>
                            
                            {canLogin ? (
                                <div className="flex gap-4 justify-center mb-16">
                                    <Link href={route('login')}>
                                        <Button size="lg" className="px-8 py-3 text-lg">
                                            Get Started
                                        </Button>
                                    </Link>
                                    {canRegister && (
                                        <Link href={route('register')}>
                                            <Button variant="outline" size="lg" className="px-8 py-3 text-lg">
                                                Create Account
                                            </Button>
                                        </Link>
                                    )}
                                </div>
                            ) : (
                                <Link href={route('dashboard')}>
                                    <Button size="lg" className="px-8 py-3 text-lg mb-16">
                                        Go to Dashboard
                                    </Button>
                                </Link>
                            )}
                        </div>

                        {/* Features Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                                <div className="h-16 w-16 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                                    <span className="text-2xl">📦</span>
                                </div>
                                <h3 className="text-xl font-semibold mb-4">Asset Tracking</h3>
                                <p className="text-gray-600">
                                    Track all IT assets including laptops, servers, networking equipment, and software licenses 
                                    with detailed information and serial numbers.
                                </p>
                            </div>

                            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                                <div className="h-16 w-16 bg-green-100 rounded-lg flex items-center justify-center mb-6">
                                    <span className="text-2xl">🏢</span>
                                </div>
                                <h3 className="text-xl font-semibold mb-4">Multi-Location Support</h3>
                                <p className="text-gray-600">
                                    Manage inventory across multiple office locations with location-specific access 
                                    and reporting for IT staff.
                                </p>
                            </div>

                            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                                <div className="h-16 w-16 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
                                    <span className="text-2xl">📊</span>
                                </div>
                                <h3 className="text-xl font-semibold mb-4">Comprehensive Reports</h3>
                                <p className="text-gray-600">
                                    Generate monthly stock reports and usage analytics to track incoming and 
                                    outgoing assets per location.
                                </p>
                            </div>

                            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                                <div className="h-16 w-16 bg-orange-100 rounded-lg flex items-center justify-center mb-6">
                                    <span className="text-2xl">↗️</span>
                                </div>
                                <h3 className="text-xl font-semibold mb-4">Movement Tracking</h3>
                                <p className="text-gray-600">
                                    Record and monitor all asset movements including incoming purchases, 
                                    outgoing deployments, and internal transfers.
                                </p>
                            </div>

                            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                                <div className="h-16 w-16 bg-red-100 rounded-lg flex items-center justify-center mb-6">
                                    <span className="text-2xl">👥</span>
                                </div>
                                <h3 className="text-xl font-semibold mb-4">Role-Based Access</h3>
                                <p className="text-gray-600">
                                    Secure access control with admin and IT staff roles, ensuring users only 
                                    see relevant data for their location.
                                </p>
                            </div>

                            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                                <div className="h-16 w-16 bg-teal-100 rounded-lg flex items-center justify-center mb-6">
                                    <span className="text-2xl">🔧</span>
                                </div>
                                <h3 className="text-xl font-semibold mb-4">Maintenance Tracking</h3>
                                <p className="text-gray-600">
                                    Monitor asset conditions, warranty periods, and maintenance schedules 
                                    to keep your IT infrastructure running smoothly.
                                </p>
                            </div>
                        </div>

                        {/* Sample Data Visualization */}
                        <div className="mt-20 text-center">
                            <h2 className="text-3xl font-bold mb-8 text-gray-900">Real-Time Dashboard</h2>
                            <div className="bg-white rounded-xl p-8 shadow-xl max-w-4xl mx-auto">
                                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                                    <div className="text-center">
                                        <div className="text-3xl font-bold text-blue-600">1,247</div>
                                        <div className="text-sm text-gray-600">Total Assets</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-3xl font-bold text-green-600">892</div>
                                        <div className="text-sm text-gray-600">Available</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-3xl font-bold text-orange-600">324</div>
                                        <div className="text-sm text-gray-600">In Use</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-3xl font-bold text-red-600">31</div>
                                        <div className="text-sm text-gray-600">Maintenance</div>
                                    </div>
                                </div>
                                <div className="h-32 bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 rounded-lg flex items-center justify-center">
                                    <span className="text-gray-500">📈 Asset Movement Chart Preview</span>
                                </div>
                            </div>
                        </div>

                        {/* Call to Action */}
                        <div className="mt-20 text-center bg-white rounded-xl p-12 shadow-xl">
                            <h2 className="text-3xl font-bold mb-4 text-gray-900">Ready to Get Started?</h2>
                            <p className="text-xl text-gray-600 mb-8">
                                Join IT departments who trust our system to manage their assets efficiently.
                            </p>
                            {canLogin ? (
                                <div className="flex gap-4 justify-center">
                                    <Link href={route('login')}>
                                        <Button size="lg" className="px-8 py-3 text-lg">
                                            Login Now
                                        </Button>
                                    </Link>
                                    {canRegister && (
                                        <Link href={route('register')}>
                                            <Button variant="outline" size="lg" className="px-8 py-3 text-lg">
                                                Sign Up Free
                                            </Button>
                                        </Link>
                                    )}
                                </div>
                            ) : (
                                <Link href={route('dashboard')}>
                                    <Button size="lg" className="px-8 py-3 text-lg">
                                        Access Dashboard
                                    </Button>
                                </Link>
                            )}
                        </div>
                    </div>
                </main>

                {/* Footer */}
                <footer className="py-8 px-6 border-t border-gray-200">
                    <div className="mx-auto max-w-7xl text-center">
                        <p className="text-gray-500">
                            © 2024 IT Inventory Management System. Built for efficient asset tracking.
                        </p>
                    </div>
                </footer>
            </div>
        </>
    );
}