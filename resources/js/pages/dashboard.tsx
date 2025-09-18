import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Dashboard() {
    const { auth } = usePage<{
        auth: { user: { name: string; email: string } };
    }>().props;

    return (
        <AppShell>
            <Head title="Dashboard" />
            
            <div className="space-y-6">
                {/* Welcome Section */}
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg p-6 text-white">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold">
                                Welcome back, {auth.user.name}! 👋
                            </h1>
                            <p className="mt-2 text-blue-100">
                                Manage your student information system from here
                            </p>
                        </div>
                        <div className="hidden sm:block">
                            <span className="text-6xl">📚</span>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    <Link href={route('students.index')}>
                        <div className="group cursor-pointer rounded-lg bg-white p-6 shadow-sm ring-1 ring-gray-200 transition-all hover:shadow-md dark:bg-gray-800 dark:ring-gray-700">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <span className="text-3xl">👥</span>
                                </div>
                                <div className="ml-4">
                                    <h3 className="text-lg font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                                        View Students
                                    </h3>
                                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                        Browse all student records
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Link>

                    <Link href={route('students.create')}>
                        <div className="group cursor-pointer rounded-lg bg-white p-6 shadow-sm ring-1 ring-gray-200 transition-all hover:shadow-md dark:bg-gray-800 dark:ring-gray-700">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <span className="text-3xl">➕</span>
                                </div>
                                <div className="ml-4">
                                    <h3 className="text-lg font-medium text-gray-900 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400">
                                        Add Student
                                    </h3>
                                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                        Register new student
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Link>

                    <div className="rounded-lg bg-white p-6 shadow-sm ring-1 ring-gray-200 dark:bg-gray-800 dark:ring-gray-700">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <span className="text-3xl">📊</span>
                            </div>
                            <div className="ml-4">
                                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                                    Analytics
                                </h3>
                                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                    Student insights & reports
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Recent Activity / Stats */}
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                    {/* Student Statistics */}
                    <div className="rounded-lg bg-white p-6 shadow-sm ring-1 ring-gray-200 dark:bg-gray-800 dark:ring-gray-700">
                        <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                            Student Overview
                        </h2>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <span className="text-lg">✅</span>
                                    <span className="text-sm text-gray-600 dark:text-gray-400">Active Students</span>
                                </div>
                                <span className="text-sm font-medium text-green-600">View All</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <span className="text-lg">🎓</span>
                                    <span className="text-sm text-gray-600 dark:text-gray-400">Graduated Students</span>
                                </div>
                                <span className="text-sm font-medium text-blue-600">View All</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <span className="text-lg">📝</span>
                                    <span className="text-sm text-gray-600 dark:text-gray-400">New Registrations</span>
                                </div>
                                <span className="text-sm font-medium text-purple-600">This Week</span>
                            </div>
                        </div>
                        <div className="mt-6">
                            <Link href={route('students.index')}>
                                <Button className="w-full">
                                    Manage Students
                                </Button>
                            </Link>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="rounded-lg bg-white p-6 shadow-sm ring-1 ring-gray-200 dark:bg-gray-800 dark:ring-gray-700">
                        <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                            Quick Links
                        </h2>
                        <div className="space-y-3">
                            <Link
                                href={route('students.index')}
                                className="block rounded-md p-3 text-sm text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700"
                            >
                                <div className="flex items-center space-x-3">
                                    <span>📋</span>
                                    <span>Student Directory</span>
                                </div>
                            </Link>
                            <Link
                                href={route('students.create')}
                                className="block rounded-md p-3 text-sm text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700"
                            >
                                <div className="flex items-center space-x-3">
                                    <span>👤</span>
                                    <span>Register New Student</span>
                                </div>
                            </Link>
                            <div className="block rounded-md p-3 text-sm text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700">
                                <div className="flex items-center space-x-3">
                                    <span>📄</span>
                                    <span>Generate Reports</span>
                                    <span className="ml-auto text-xs text-gray-400">Coming Soon</span>
                                </div>
                            </div>
                            <div className="block rounded-md p-3 text-sm text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700">
                                <div className="flex items-center space-x-3">
                                    <span>⚙️</span>
                                    <span>System Settings</span>
                                    <span className="ml-auto text-xs text-gray-400">Coming Soon</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Getting Started */}
                <div className="rounded-lg border-2 border-dashed border-gray-300 p-8 text-center dark:border-gray-600">
                    <span className="text-4xl mb-4 block">🚀</span>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                        Ready to manage students?
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-md mx-auto">
                        Start by adding your first student or explore the existing student directory to see how the system works.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <Link href={route('students.create')}>
                            <Button>
                                Add First Student
                            </Button>
                        </Link>
                        <Link href={route('students.index')}>
                            <Button variant="outline">
                                Browse Students
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </AppShell>
    );
}