<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Student>
 */
class StudentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $intakeDate = fake()->dateTimeBetween('-4 years', '-1 month');
        
        return [
            'user_id' => User::factory(),
            'nric_no' => fake()->unique()->regexify('[0-9]{6}-[0-9]{2}-[0-9]{4}'),
            'matric_no' => fake()->unique()->regexify('STU[0-9]{6}'),
            'program' => fake()->randomElement([
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
            ]),
            'intake_date' => $intakeDate,
            'status' => fake()->randomElement(['active', 'inactive', 'graduated', 'suspended']),
            'phone' => fake()->phoneNumber(),
            'address' => fake()->address(),
            'guardian_name' => fake()->name(),
        ];
    }

    /**
     * Indicate that the student is active.
     */
    public function active(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'active',
        ]);
    }

    /**
     * Indicate that the student has graduated.
     */
    public function graduated(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'graduated',
            'intake_date' => fake()->dateTimeBetween('-6 years', '-3 years'),
        ]);
    }

    /**
     * Indicate that the student is in a computer science program.
     */
    public function computerScience(): static
    {
        return $this->state(fn (array $attributes) => [
            'program' => fake()->randomElement([
                'Computer Science',
                'Software Engineering',
                'Information Technology',
                'Data Science',
                'Cybersecurity',
            ]),
        ]);
    }
}