import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="Student Management System">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-indigo-900">
                {/* Header */}
                <header className="px-4 py-6 lg:px-8">
                    <nav className="mx-auto flex max-w-7xl items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <div className="rounded-lg bg-blue-600 p-2">
                                <span className="text-xl font-bold text-white">📚</span>
                            </div>
                            <span className="text-xl font-bold text-gray-900 dark:text-white">StudentsHub</span>
                        </div>
                        <div className="flex items-center space-x-4">
                            {auth.user ? (
                                <Link
                                    href={route('dashboard')}
                                    className="inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={route('login')}
                                        className="text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                                    >
                                        Log in
                                    </Link>
                                    <Link
                                        href={route('register')}
                                        className="inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                    >
                                        Get Started
                                    </Link>
                                </>
                            )}
                        </div>
                    </nav>
                </header>

                {/* Hero Section */}
                <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl dark:text-white">
                            <span className="block">📊 Student Management</span>
                            <span className="block text-blue-600">Made Simple</span>
                        </h1>
                        <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600 dark:text-gray-300">
                            Comprehensive student information management system for educational institutions. 
                            Track student records, academic programs, and manage enrollment data efficiently.
                        </p>
                        
                        {!auth.user && (
                            <div className="mt-10 flex justify-center space-x-4">
                                <Link
                                    href={route('register')}
                                    className="inline-flex items-center rounded-lg bg-blue-600 px-6 py-3 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                >
                                    Start Managing Students
                                    <span className="ml-2">→</span>
                                </Link>
                                <Link
                                    href={route('login')}
                                    className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-6 py-3 text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                                >
                                    Sign In
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Features Section */}
                    <div className="mt-20">
                        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                            <div className="rounded-lg bg-white p-6 shadow-sm ring-1 ring-gray-200 dark:bg-gray-800 dark:ring-gray-700">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <span className="text-2xl">👥</span>
                                    </div>
                                    <div className="ml-4">
                                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">Student Records</h3>
                                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                            Complete student information management
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="rounded-lg bg-white p-6 shadow-sm ring-1 ring-gray-200 dark:bg-gray-800 dark:ring-gray-700">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <span className="text-2xl">🎓</span>
                                    </div>
                                    <div className="ml-4">
                                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">Program Tracking</h3>
                                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                            Monitor academic programs and intake dates
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="rounded-lg bg-white p-6 shadow-sm ring-1 ring-gray-200 dark:bg-gray-800 dark:ring-gray-700">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <span className="text-2xl">📱</span>
                                    </div>
                                    <div className="ml-4">
                                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">Mobile Friendly</h3>
                                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                            Access from anywhere, any device
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="rounded-lg bg-white p-6 shadow-sm ring-1 ring-gray-200 dark:bg-gray-800 dark:ring-gray-700">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <span className="text-2xl">📊</span>
                                    </div>
                                    <div className="ml-4">
                                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">Analytics</h3>
                                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                            Student status and enrollment insights
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Mock Interface Preview */}
                    <div className="mt-20">
                        <div className="text-center">
                            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Intuitive Interface</h2>
                            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
                                Clean, modern design built for efficiency
                            </p>
                        </div>
                        
                        <div className="mt-12 rounded-lg bg-white p-8 shadow-lg ring-1 ring-gray-200 dark:bg-gray-800 dark:ring-gray-700">
                            <div className="space-y-4">
                                <div className="flex items-center justify-between border-b border-gray-200 pb-4 dark:border-gray-700">
                                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">Student Dashboard</h3>
                                    <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                                        Live Preview
                                    </span>
                                </div>
                                
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                                    <div className="rounded-md bg-blue-50 p-4 dark:bg-blue-900/20">
                                        <div className="text-center">
                                            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">1,247</div>
                                            <div className="text-sm text-blue-800 dark:text-blue-300">Total Students</div>
                                        </div>
                                    </div>
                                    
                                    <div className="rounded-md bg-green-50 p-4 dark:bg-green-900/20">
                                        <div className="text-center">
                                            <div className="text-2xl font-bold text-green-600 dark:text-green-400">1,156</div>
                                            <div className="text-sm text-green-800 dark:text-green-300">Active Students</div>
                                        </div>
                                    </div>
                                    
                                    <div className="rounded-md bg-purple-50 p-4 dark:bg-purple-900/20">
                                        <div className="text-center">
                                            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">23</div>
                                            <div className="text-sm text-purple-800 dark:text-purple-300">Programs</div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="mt-6 rounded-md border border-gray-200 dark:border-gray-700">
                                    <div className="grid grid-cols-1 divide-y divide-gray-200 dark:divide-gray-700">
                                        <div className="flex items-center justify-between p-4">
                                            <div className="flex items-center space-x-3">
                                                <div className="h-8 w-8 rounded-full bg-blue-500"></div>
                                                <div>
                                                    <div className="font-medium text-gray-900 dark:text-white">John Smith</div>
                                                    <div className="text-sm text-gray-500 dark:text-gray-400">STU001234 • Computer Science</div>
                                                </div>
                                            </div>
                                            <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900/30 dark:text-green-300">
                                                Active
                                            </span>
                                        </div>
                                        
                                        <div className="flex items-center justify-between p-4">
                                            <div className="flex items-center space-x-3">
                                                <div className="h-8 w-8 rounded-full bg-purple-500"></div>
                                                <div>
                                                    <div className="font-medium text-gray-900 dark:text-white">Sarah Johnson</div>
                                                    <div className="text-sm text-gray-500 dark:text-gray-400">STU001235 • Business Administration</div>
                                                </div>
                                            </div>
                                            <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900/30 dark:text-green-300">
                                                Active
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* CTA Section */}
                    {!auth.user && (
                        <div className="mt-20 text-center">
                            <div className="rounded-lg bg-blue-600 px-8 py-12">
                                <h2 className="text-3xl font-bold text-white">Ready to get started?</h2>
                                <p className="mt-4 text-lg text-blue-100">
                                    Join thousands of institutions already using StudentsHub
                                </p>
                                <Link
                                    href={route('register')}
                                    className="mt-8 inline-flex items-center rounded-lg bg-white px-8 py-3 text-base font-medium text-blue-600 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600"
                                >
                                    Create Your Account
                                    <span className="ml-2">🚀</span>
                                </Link>
                            </div>
                        </div>
                    )}
                </main>
            </div>
        </>
    );
}