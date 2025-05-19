<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Snippet extends Model {
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'user_id',
        'history',
        'title',
        'language',
        'code',
    ];

    protected $attributes = [
        'history' => '[]'
    ];

    protected $casts = [
        'history' => 'array',
    ];

    protected $hidden = [
        'history',
    ];

    public function course() {
        return $this->belongsTo(Course::class);
    }

    public function user() {
        return $this->belongsTo(User::class);
    }
}
