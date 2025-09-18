import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
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

interface Props {
    student: Student;
    [key: string]: unknown;
}

export default function ShowStudent({ student }: Props) {
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
            weekday: 'long',
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        });
    };

    const handleDelete = () => {
        if (confirm('Are you sure you want to delete this student record? This action cannot be undone.')) {
            router.delete(route('students.destroy', student.id));
        }
    };

    return (
        <AppShell>
            <Head title={`${student.user.name} - Student Details`} />
            
            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <div className="flex items-center space-x-3">
                            <div className="h-12 w-12 rounded-full bg-blue-500 flex items-center justify-center">
                                <span className="text-xl font-medium text-white">
                                    {student.user.name.charAt(0)}
                                </span>
                            </div>
                            <div>
                                <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
                                    {student.user.name}
                                </h1>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    {student.matric_no} • {student.program}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center space-x-3">
                        <Link href={route('students.index')}>
                            <Button variant="outline">
                                Back to Students
                            </Button>
                        </Link>
                        <Link href={route('students.edit', student.id)}>
                            <Button>
                                Edit Student
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Status Badge */}
                <div className="flex items-center">
                    <span className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${getStatusColor(student.status)}`}>
                        {student.status.charAt(0).toUpperCase() + student.status.slice(1)}
                    </span>
                </div>

                {/* Student Information */}
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                    {/* Personal Information */}
                    <div className="rounded-lg bg-white p-6 shadow-sm ring-1 ring-gray-200 dark:bg-gray-800 dark:ring-gray-700">
                        <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                            Personal Information
                        </h2>
                        <dl className="space-y-4">
                            <div>
                                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Full Name</dt>
                                <dd className="mt-1 text-sm text-gray-900 dark:text-white">{student.user.name}</dd>
                            </div>
                            <div>
                                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Email Address</dt>
                                <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                                    <a href={`mailto:${student.user.email}`} className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
                                        {student.user.email}
                                    </a>
                                </dd>
                            </div>
                            <div>
                                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">NRIC/IC Number</dt>
                                <dd className="mt-1 text-sm text-gray-900 dark:text-white">{student.nric_no}</dd>
                            </div>
                            <div>
                                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Phone Number</dt>
                                <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                                    {student.phone ? (
                                        <a href={`tel:${student.phone}`} className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
                                            {student.phone}
                                        </a>
                                    ) : (
                                        <span className="text-gray-400 dark:text-gray-500">Not provided</span>
                                    )}
                                </dd>
                            </div>
                            <div>
                                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Guardian/Parent</dt>
                                <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                                    {student.guardian_name || <span className="text-gray-400 dark:text-gray-500">Not provided</span>}
                                </dd>
                            </div>
                        </dl>
                    </div>

                    {/* Academic Information */}
                    <div className="rounded-lg bg-white p-6 shadow-sm ring-1 ring-gray-200 dark:bg-gray-800 dark:ring-gray-700">
                        <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                            Academic Information
                        </h2>
                        <dl className="space-y-4">
                            <div>
                                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Matriculation Number</dt>
                                <dd className="mt-1 text-sm text-gray-900 dark:text-white font-mono">{student.matric_no}</dd>
                            </div>
                            <div>
                                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Academic Program</dt>
                                <dd className="mt-1 text-sm text-gray-900 dark:text-white">{student.program}</dd>
                            </div>
                            <div>
                                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Intake Date</dt>
                                <dd className="mt-1 text-sm text-gray-900 dark:text-white">{formatDate(student.intake_date)}</dd>
                            </div>
                            <div>
                                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Current Status</dt>
                                <dd className="mt-1">
                                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusColor(student.status)}`}>
                                        {student.status.charAt(0).toUpperCase() + student.status.slice(1)}
                                    </span>
                                </dd>
                            </div>
                        </dl>
                    </div>

                    {/* Address Information */}
                    {student.address && (
                        <div className="lg:col-span-2">
                            <div className="rounded-lg bg-white p-6 shadow-sm ring-1 ring-gray-200 dark:bg-gray-800 dark:ring-gray-700">
                                <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                                    Address Information
                                </h2>
                                <dl>
                                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Current Address</dt>
                                    <dd className="mt-1 text-sm text-gray-900 dark:text-white whitespace-pre-line">
                                        {student.address}
                                    </dd>
                                </dl>
                            </div>
                        </div>
                    )}

                    {/* System Information */}
                    <div className="lg:col-span-2">
                        <div className="rounded-lg bg-white p-6 shadow-sm ring-1 ring-gray-200 dark:bg-gray-800 dark:ring-gray-700">
                            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                                System Information
                            </h2>
                            <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <div>
                                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Record Created</dt>
                                    <dd className="mt-1 text-sm text-gray-900 dark:text-white">{formatDate(student.created_at)}</dd>
                                </div>
                                <div>
                                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Last Updated</dt>
                                    <dd className="mt-1 text-sm text-gray-900 dark:text-white">{formatDate(student.updated_at)}</dd>
                                </div>
                            </dl>
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-end space-x-3 pt-6 border-t border-gray-200 dark:border-gray-700">
                    <Button
                        variant="destructive"
                        onClick={handleDelete}
                    >
                        Delete Student
                    </Button>
                    <Link href={route('students.edit', student.id)}>
                        <Button>
                            Edit Student
                        </Button>
                    </Link>
                </div>
            </div>
        </AppShell>
    );
}