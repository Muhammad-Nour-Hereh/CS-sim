<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Course extends Model {
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'title',
    ];

    public function guildbookPages() {
        return $this->hasMany(Guildbook::class);
    }

    public function courses() {
        return $this->belongsToMany(User::class)
            ->using(UserCourse::class)
            ->withPivot('progress_id')
            ->withTimestamps();
    }
}
