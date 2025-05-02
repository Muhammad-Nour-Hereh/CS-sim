<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Question extends Model {
    use HasFactory;

    protected $fillable = [
        'title',
        'question_type',
        'content',
        'course_id',
    ];

    public function course() {
        return $this->belongsTo(Course::class);
    }
    public function levels() {
        return $this->belongsToMany(Level::class);
    }
}
