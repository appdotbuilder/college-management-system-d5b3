<?php

namespace Database\Seeders;

use App\Models\Student;
use App\Models\User;
use Illuminate\Database\Seeder;

class StudentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create some sample students
        Student::factory()
            ->count(25)
            ->active()
            ->create();

        Student::factory()
            ->count(8)
            ->graduated()
            ->create();

        Student::factory()
            ->count(3)
            ->create([
                'status' => 'inactive'
            ]);

        Student::factory()
            ->count(2)
            ->create([
                'status' => 'suspended'
            ]);
    }
}