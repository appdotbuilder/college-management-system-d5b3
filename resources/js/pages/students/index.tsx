import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';

interface Student {
    id: number;
    nric_no: string;
    matric_no: string;
    program: string;
    intake_date: string;
    status: string;
    phone: string | null;
    address: string | null;
    guardian_name: string | null;
    created_at: string;
    updated_at: string;
    user: {
        id: number;
        name: string;
        email: string;
    };
}

interface Statistics {
    total: number;
    active: number;
    graduated: number;
    inactive: number;
}

interface Props {
    students: {
        data: Student[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
        links: Array<{
            url: string | null;
            label: string;
            active: boolean;
        }>;
    };
    statistics: Statistics;
    [key: string]: unknown;
}

export default function StudentsIndex({ students, statistics }: Props) {
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'active':
                return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
            case 'graduated':
                return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
            case 'inactive':
                return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
            case 'suspended':
                return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
            default:
                return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        });
    };

    return (
        <AppShell>
            <Head title="Students" />
            
            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
                            Students
                        </h1>
                        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                            Manage student information and records
                        </p>
                    </div>
                    <Link href={route('students.create')}>
                        <Button>
                            Add Student
                        </Button>
                    </Link>
                </div>

                {/* Statistics Cards */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <div className="rounded-lg bg-white p-6 shadow-sm ring-1 ring-gray-200 dark:bg-gray-800 dark:ring-gray-700">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <span className="text-2xl">👥</span>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Students</p>
                                <p className="text-2xl font-semibold text-gray-900 dark:text-white">{statistics.total}</p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="rounded-lg bg-white p-6 shadow-sm ring-1 ring-gray-200 dark:bg-gray-800 dark:ring-gray-700">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <span className="text-2xl">✅</span>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Active</p>
                                <p className="text-2xl font-semibold text-green-600">{statistics.active}</p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="rounded-lg bg-white p-6 shadow-sm ring-1 ring-gray-200 dark:bg-gray-800 dark:ring-gray-700">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <span className="text-2xl">🎓</span>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Graduated</p>
                                <p className="text-2xl font-semibold text-blue-600">{statistics.graduated}</p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="rounded-lg bg-white p-6 shadow-sm ring-1 ring-gray-200 dark:bg-gray-800 dark:ring-gray-700">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <span className="text-2xl">⏸️</span>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Inactive</p>
                                <p className="text-2xl font-semibold text-gray-600">{statistics.inactive}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Students Table */}
                <div className="rounded-lg bg-white shadow-sm ring-1 ring-gray-200 dark:bg-gray-800 dark:ring-gray-700">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                            <thead className="bg-gray-50 dark:bg-gray-900/50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                                        Student
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                                        Matric No
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                                        Program
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                                        Intake Date
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                                        Status
                                    </th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
                                {students.data.map((student) => (
                                    <tr key={student.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="h-10 w-10 flex-shrink-0">
                                                    <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center">
                                                        <span className="text-sm font-medium text-white">
                                                            {student.user.name.charAt(0)}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="ml-4">
                                                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                                                        {student.user.name}
                                                    </div>
                                                    <div className="text-sm text-gray-500 dark:text-gray-400">
                                                        {student.user.email}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                            {student.matric_no}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                            {student.program}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                            {formatDate(student.intake_date)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusColor(student.status)}`}>
                                                {student.status.charAt(0).toUpperCase() + student.status.slice(1)}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <div className="flex items-center justify-end space-x-2">
                                                <Link
                                                    href={route('students.show', student.id)}
                                                    className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                                                >
                                                    View
                                                </Link>
                                                <Link
                                                    href={route('students.edit', student.id)}
                                                    className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300"
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

                    {students.data.length === 0 && (
                        <div className="text-center py-12">
                            <span className="text-6xl mb-4 block">📚</span>
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No students found</h3>
                            <p className="text-gray-500 dark:text-gray-400 mb-4">Get started by adding your first student.</p>
                            <Link href={route('students.create')}>
                                <Button>
                                    Add Student
                                </Button>
                            </Link>
                        </div>
                    )}

                    {/* Pagination */}
                    {students.data.length > 0 && students.last_page > 1 && (
                        <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6 dark:bg-gray-800 dark:border-gray-700">
                            <div className="flex-1 flex justify-between sm:hidden">
                                {students.links[0].url && (
                                    <Link
                                        href={students.links[0].url}
                                        className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                                    >
                                        Previous
                                    </Link>
                                )}
                                {students.links[students.links.length - 1].url && (
                                    <Link
                                        href={students.links[students.links.length - 1].url as string}
                                        className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                                    >
                                        Next
                                    </Link>
                                )}
                            </div>
                            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                                <div>
                                    <p className="text-sm text-gray-700 dark:text-gray-300">
                                        Showing <span className="font-medium">{(students.current_page - 1) * students.per_page + 1}</span> to{' '}
                                        <span className="font-medium">{Math.min(students.current_page * students.per_page, students.total)}</span> of{' '}
                                        <span className="font-medium">{students.total}</span> results
                                    </p>
                                </div>
                                <div>
                                    <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                                        {students.links.map((link, index) => {
                                            if (!link.url) {
                                                return (
                                                    <span
                                                        key={index}
                                                        className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 cursor-not-allowed dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400"
                                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                                    />
                                                );
                                            }

                                            return (
                                                <Link
                                                    key={index}
                                                    href={link.url}
                                                    className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                                                        link.active
                                                            ? 'z-10 bg-blue-50 border-blue-500 text-blue-600 dark:bg-blue-900/50 dark:border-blue-500 dark:text-blue-300'
                                                            : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700'
                                                    }`}
                                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                                />
                                            );
                                        })}
                                    </nav>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AppShell>
    );
}