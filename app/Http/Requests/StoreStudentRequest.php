<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreStudentRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'user_id' => 'required|exists:users,id',
            'nric_no' => 'required|string|unique:students,nric_no|max:20',
            'matric_no' => 'required|string|max:50',
            'program' => 'required|string|max:255',
            'intake_date' => 'required|date',
            'status' => 'required|in:active,inactive,graduated,suspended',
            'phone' => 'nullable|string|max:20',
            'address' => 'nullable|string',
            'guardian_name' => 'nullable|string|max:255',
        ];
    }

    /**
     * Get custom error messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'user_id.required' => 'Please select a user for this student.',
            'user_id.exists' => 'The selected user does not exist.',
            'nric_no.required' => 'NRIC/IC number is required.',
            'nric_no.unique' => 'This NRIC/IC number is already registered.',
            'matric_no.required' => 'Matriculation number is required.',
            'program.required' => 'Academic program is required.',
            'intake_date.required' => 'Intake date is required.',
            'intake_date.date' => 'Please provide a valid intake date.',
            'status.required' => 'Student status is required.',
            'status.in' => 'Please select a valid status.',
        ];
    }
}