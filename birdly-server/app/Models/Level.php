<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Level extends Model {
    use HasFactory;

    protected $fillable = [
        'title',
        'course_id',
    ];

    public function course() {
        return $this->belongsTo(Course::class);
    }

    public function questions() {
        return $this->belongsToMany(Question::class);
    }
}
