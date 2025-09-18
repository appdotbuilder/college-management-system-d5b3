<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\Student
 *
 * @property int $id
 * @property int $user_id
 * @property string $nric_no
 * @property string $matric_no
 * @property string $program
 * @property \Illuminate\Support\Carbon $intake_date
 * @property string $status
 * @property string|null $phone
 * @property string|null $address
 * @property string|null $guardian_name
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\User $user
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|Student newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Student newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Student query()
 * @method static \Illuminate\Database\Eloquent\Builder|Student whereAddress($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Student whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Student whereGuardianName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Student whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Student whereIntakeDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Student whereMatricNo($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Student whereNricNo($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Student wherePhone($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Student whereProgram($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Student whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Student whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Student whereUserId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Student active()
 * @method static \Database\Factories\StudentFactory factory($count = null, $state = [])
 * @method static Student create(array $attributes = [])
 * @method static Student firstOrCreate(array $attributes = [], array $values = [])
 * 
 * @mixin \Eloquent
 */
class Student extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'user_id',
        'nric_no',
        'matric_no',
        'program',
        'intake_date',
        'status',
        'phone',
        'address',
        'guardian_name',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'intake_date' => 'date',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the user that owns the student record.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Scope a query to only include active students.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeActive($query)
    {
        return $query->where('status', 'active');
    }

    /**
     * Get the student's full name from the associated user.
     *
     * @return string|null
     */
    public function getFullNameAttribute(): ?string
    {
        return $this->user->name ?? null;
    }

    /**
     * Get the student's email from the associated user.
     *
     * @return string|null
     */
    public function getEmailAttribute(): ?string
    {
        return $this->user->email ?? null;
    }
}