<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreStudentRequest;
use App\Http\Requests\UpdateStudentRequest;
use App\Models\Student;
use App\Models\User;
use Inertia\Inertia;

class StudentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $students = Student::with('user')
            ->latest()
            ->paginate(10);
        
        $statistics = [
            'total' => Student::count(),
            'active' => Student::where('status', 'active')->count(),
            'graduated' => Student::where('status', 'graduated')->count(),
            'inactive' => Student::where('status', 'inactive')->count(),
        ];
        
        return Inertia::render('students/index', [
            'students' => $students,
            'statistics' => $statistics,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $users = User::select('id', 'name', 'email')
            ->whereDoesntHave('student')
            ->orderBy('name')
            ->get();
        
        $programs = [
            'Computer Science',
            'Software Engineering', 
            'Information Technology',
            'Data Science',
            'Cybersecurity',
            'Business Administration',
            'Accounting',
            'Marketing',
            'Mechanical Engineering',
            'Civil Engineering',
            'Electrical Engineering',
            'Medicine',
            'Nursing',
            'Psychology',
            'Education',
        ];
        
        return Inertia::render('students/create', [
            'users' => $users,
            'programs' => $programs,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreStudentRequest $request)
    {
        $student = Student::create($request->validated());

        return redirect()->route('students.show', $student)
            ->with('success', 'Student record created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Student $student)
    {
        $student->load('user');
        
        return Inertia::render('students/show', [
            'student' => $student,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Student $student)
    {
        $student->load('user');
        
        $users = User::select('id', 'name', 'email')
            ->where(function($query) use ($student) {
                $query->whereDoesntHave('student')
                      ->orWhere('id', $student->user_id);
            })
            ->orderBy('name')
            ->get();
        
        $programs = [
            'Computer Science',
            'Software Engineering',
            'Information Technology',
            'Data Science',
            'Cybersecurity',
            'Business Administration',
            'Accounting',
            'Marketing',
            'Mechanical Engineering',
            'Civil Engineering',
            'Electrical Engineering',
            'Medicine',
            'Nursing',
            'Psychology',
            'Education',
        ];
        
        return Inertia::render('students/edit', [
            'student' => $student,
            'users' => $users,
            'programs' => $programs,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateStudentRequest $request, Student $student)
    {
        $student->update($request->validated());

        return redirect()->route('students.show', $student)
            ->with('success', 'Student record updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Student $student)
    {
        $student->delete();

        return redirect()->route('students.index')
            ->with('success', 'Student record deleted successfully.');
    }
}