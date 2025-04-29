<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;

class Guildbook extends Model {
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'course_id',
        'slug',
        'title',
        'mdx_path',
        'order_index',
    ];

    public function course() {
        return $this->belongsTo(Course::class);
    }
}
