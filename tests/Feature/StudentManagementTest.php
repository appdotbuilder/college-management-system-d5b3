<?php

use App\Models\Student;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

beforeEach(function () {
    // Create and authenticate a user
    $this->user = User::factory()->create();
    $this->actingAs($this->user);
});

test('can view students index', function () {
    Student::factory()->count(5)->create();

    $response = $this->get(route('students.index'));

    $response->assertOk();
    $response->assertInertia(fn ($page) => 
        $page->component('students/index')
            ->has('students.data', 5)
            ->has('statistics')
    );
});

test('can view create student form', function () {
    User::factory()->count(3)->create();

    $response = $this->get(route('students.create'));

    $response->assertOk();
    $response->assertInertia(fn ($page) => 
        $page->component('students/create')
            ->has('users')
            ->has('programs')
    );
});

test('can create new student', function () {
    $user = User::factory()->create();
    
    $studentData = [
        'user_id' => $user->id,
        'nric_no' => '123456-78-9012',
        'matric_no' => 'STU001234',
        'program' => 'Computer Science',
        'intake_date' => '2024-01-15',
        'status' => 'active',
        'phone' => '+60 12-345 6789',
        'address' => '123 Main Street, City',
        'guardian_name' => 'John Doe Sr.',
    ];

    $response = $this->post(route('students.store'), $studentData);

    $response->assertRedirect();
    $this->assertDatabaseHas('students', [
        'nric_no' => '123456-78-9012',
        'matric_no' => 'STU001234',
        'program' => 'Computer Science',
    ]);
});

test('can view student details', function () {
    $student = Student::factory()->create();

    $response = $this->get(route('students.show', $student));

    $response->assertOk();
    $response->assertInertia(fn ($page) => 
        $page->component('students/show')
            ->has('student')
            ->where('student.id', $student->id)
    );
});

test('can view edit student form', function () {
    $student = Student::factory()->create();

    $response = $this->get(route('students.edit', $student));

    $response->assertOk();
    $response->assertInertia(fn ($page) => 
        $page->component('students/edit')
            ->has('student')
            ->has('users')
            ->has('programs')
            ->where('student.id', $student->id)
    );
});

test('can update student', function () {
    $student = Student::factory()->create();
    
    $updateData = [
        'user_id' => $student->user_id,
        'nric_no' => $student->nric_no,
        'matric_no' => 'STU999999',
        'program' => 'Software Engineering',
        'intake_date' => $student->intake_date,
        'status' => 'graduated',
        'phone' => '+60 19-876 5432',
        'address' => 'Updated Address',
        'guardian_name' => 'Updated Guardian',
    ];

    $response = $this->put(route('students.update', $student), $updateData);

    $response->assertRedirect();
    $this->assertDatabaseHas('students', [
        'id' => $student->id,
        'matric_no' => 'STU999999',
        'program' => 'Software Engineering',
        'status' => 'graduated',
    ]);
});

test('can delete student', function () {
    $student = Student::factory()->create();

    $response = $this->delete(route('students.destroy', $student));

    $response->assertRedirect(route('students.index'));
    $this->assertDatabaseMissing('students', ['id' => $student->id]);
});

test('student creation requires valid data', function () {
    $response = $this->post(route('students.store'), []);

    $response->assertSessionHasErrors([
        'user_id', 'nric_no', 'matric_no', 'program', 'intake_date', 'status'
    ]);
});

test('student nric must be unique', function () {
    $existingStudent = Student::factory()->create(['nric_no' => '123456-78-9012']);
    $user = User::factory()->create();

    $response = $this->post(route('students.store'), [
        'user_id' => $user->id,
        'nric_no' => '123456-78-9012',
        'matric_no' => 'STU002345',
        'program' => 'Computer Science',
        'intake_date' => '2024-01-15',
        'status' => 'active',
    ]);

    $response->assertSessionHasErrors(['nric_no']);
});

test('student statistics are calculated correctly', function () {
    Student::factory()->count(5)->create(['status' => 'active']);
    Student::factory()->count(3)->create(['status' => 'graduated']);
    Student::factory()->count(2)->create(['status' => 'inactive']);

    $response = $this->get(route('students.index'));

    $response->assertInertia(fn ($page) => 
        $page->where('statistics.total', 10)
            ->where('statistics.active', 5)
            ->where('statistics.graduated', 3)
            ->where('statistics.inactive', 2)
    );
});