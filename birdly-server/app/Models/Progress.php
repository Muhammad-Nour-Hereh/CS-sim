<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Progress extends Model {
    use HasFactory, SoftDeletes;

    protected $table = 'progresses';

    protected $fillable = [
        'exp'
    ];

    public function userCourse() {
        return $this->hasOne(UserCourse::class);
    }

    public function completedLevels() {
        return $this->belongsToMany(Level::class, 'completed_levels');
    }

    public function mistakes() {
        return $this->belongsToMany(Question::class, 'mistakes')
            ->withPivot('count');
    }
}
