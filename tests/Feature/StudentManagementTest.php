<?php

namespace Tests\Feature;

use App\Models\Student;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class StudentManagementTest extends TestCase
{
    use RefreshDatabase, WithFaker;

    protected function setUp(): void
    {
        parent::setUp();
        
        // Create and authenticate a user
        $this->user = User::factory()->create();
        $this->actingAs($this->user);
    }

    public function test_can_view_students_index(): void
    {
        Student::factory()->count(5)->create();

        $response = $this->get(route('students.index'));

        $response->assertOk();
        $response->assertInertia(fn ($page) => 
            $page->component('students/index')
                ->has('students.data', 5)
                ->has('statistics')
        );
    }

    public function test_can_view_create_student_form(): void
    {
        User::factory()->count(3)->create();

        $response = $this->get(route('students.create'));

        $response->assertOk();
        $response->assertInertia(fn ($page) => 
            $page->component('students/create')
                ->has('users')
                ->has('programs')
        );
    }

    public function test_can_create_new_student(): void
    {
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
    }

    public function test_can_view_student_details(): void
    {
        $student = Student::factory()->create();

        $response = $this->get(route('students.show', $student));

        $response->assertOk();
        $response->assertInertia(fn ($page) => 
            $page->component('students/show')
                ->has('student')
                ->where('student.id', $student->id)
        );
    }

    public function test_can_view_edit_student_form(): void
    {
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
    }

    public function test_can_update_student(): void
    {
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
    }

    public function test_can_delete_student(): void
    {
        $student = Student::factory()->create();

        $response = $this->delete(route('students.destroy', $student));

        $response->assertRedirect(route('students.index'));
        $this->assertDatabaseMissing('students', ['id' => $student->id]);
    }

    public function test_student_creation_requires_valid_data(): void
    {
        $response = $this->post(route('students.store'), []);

        $response->assertSessionHasErrors([
            'user_id', 'nric_no', 'matric_no', 'program', 'intake_date', 'status'
        ]);
    }

    public function test_student_nric_must_be_unique(): void
    {
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
    }

    public function test_student_statistics_are_calculated_correctly(): void
    {
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
    }
}