import React from 'react';
import { Head, useForm, Link } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import InputError from '@/components/input-error';

interface User {
    id: number;
    name: string;
    email: string;
}

interface Props {
    users: User[];
    programs: string[];
    [key: string]: unknown;
}



export default function CreateStudent({ users, programs }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        user_id: '',
        nric_no: '',
        matric_no: '',
        program: '',
        intake_date: '',
        status: 'active',
        phone: '',
        address: '',
        guardian_name: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('students.store'));
    };

    return (
        <AppShell>
            <Head title="Add Student" />
            
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
                            Add Student
                        </h1>
                        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                            Create a new student record
                        </p>
                    </div>
                    <Link href={route('students.index')}>
                        <Button variant="outline">
                            Back to Students
                        </Button>
                    </Link>
                </div>

                {/* Form */}
                <div className="rounded-lg bg-white shadow-sm ring-1 ring-gray-200 dark:bg-gray-800 dark:ring-gray-700">
                    <form onSubmit={handleSubmit} className="space-y-6 p-6">
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                            {/* User Selection */}
                            <div className="sm:col-span-2">
                                <label htmlFor="user_id" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    User Account <span className="text-red-500">*</span>
                                </label>
                                <select
                                    id="user_id"
                                    value={data.user_id}
                                    onChange={(e) => setData('user_id', e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                    required
                                >
                                    <option value="">Select a user</option>
                                    {users.map((user) => (
                                        <option key={user.id} value={user.id}>
                                            {user.name} ({user.email})
                                        </option>
                                    ))}
                                </select>
                                <InputError message={errors.user_id} className="mt-2" />
                            </div>

                            {/* NRIC No */}
                            <div>
                                <label htmlFor="nric_no" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    NRIC/IC Number <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="nric_no"
                                    value={data.nric_no}
                                    onChange={(e) => setData('nric_no', e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                    placeholder="e.g., 123456-78-9012"
                                    required
                                />
                                <InputError message={errors.nric_no} className="mt-2" />
                            </div>

                            {/* Matric No */}
                            <div>
                                <label htmlFor="matric_no" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Matriculation Number <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="matric_no"
                                    value={data.matric_no}
                                    onChange={(e) => setData('matric_no', e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                    placeholder="e.g., STU001234"
                                    required
                                />
                                <InputError message={errors.matric_no} className="mt-2" />
                            </div>

                            {/* Program */}
                            <div>
                                <label htmlFor="program" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Academic Program <span className="text-red-500">*</span>
                                </label>
                                <select
                                    id="program"
                                    value={data.program}
                                    onChange={(e) => setData('program', e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                    required
                                >
                                    <option value="">Select a program</option>
                                    {programs.map((program) => (
                                        <option key={program} value={program}>
                                            {program}
                                        </option>
                                    ))}
                                </select>
                                <InputError message={errors.program} className="mt-2" />
                            </div>

                            {/* Intake Date */}
                            <div>
                                <label htmlFor="intake_date" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Intake Date <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="date"
                                    id="intake_date"
                                    value={data.intake_date}
                                    onChange={(e) => setData('intake_date', e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                    required
                                />
                                <InputError message={errors.intake_date} className="mt-2" />
                            </div>

                            {/* Status */}
                            <div>
                                <label htmlFor="status" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Status <span className="text-red-500">*</span>
                                </label>
                                <select
                                    id="status"
                                    value={data.status}
                                    onChange={(e) => setData('status', e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                    required
                                >
                                    <option value="active">Active</option>
                                    <option value="inactive">Inactive</option>
                                    <option value="graduated">Graduated</option>
                                    <option value="suspended">Suspended</option>
                                </select>
                                <InputError message={errors.status} className="mt-2" />
                            </div>

                            {/* Phone */}
                            <div>
                                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Phone Number
                                </label>
                                <input
                                    type="tel"
                                    id="phone"
                                    value={data.phone}
                                    onChange={(e) => setData('phone', e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                    placeholder="e.g., +60 12-345 6789"
                                />
                                <InputError message={errors.phone} className="mt-2" />
                            </div>

                            {/* Guardian Name */}
                            <div>
                                <label htmlFor="guardian_name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Guardian/Parent Name
                                </label>
                                <input
                                    type="text"
                                    id="guardian_name"
                                    value={data.guardian_name}
                                    onChange={(e) => setData('guardian_name', e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                    placeholder="Guardian or parent full name"
                                />
                                <InputError message={errors.guardian_name} className="mt-2" />
                            </div>

                            {/* Address */}
                            <div className="sm:col-span-2">
                                <label htmlFor="address" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Address
                                </label>
                                <textarea
                                    id="address"
                                    rows={3}
                                    value={data.address}
                                    onChange={(e) => setData('address', e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                    placeholder="Full address including city, state, and postal code"
                                />
                                <InputError message={errors.address} className="mt-2" />
                            </div>
                        </div>

                        {/* Form Actions */}
                        <div className="flex items-center justify-end space-x-3 pt-6 border-t border-gray-200 dark:border-gray-700">
                            <Link href={route('students.index')}>
                                <Button variant="outline" type="button">
                                    Cancel
                                </Button>
                            </Link>
                            <Button type="submit" disabled={processing}>
                                {processing ? 'Creating...' : 'Create Student'}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </AppShell>
    );
}