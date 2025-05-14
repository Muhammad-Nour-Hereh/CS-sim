<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ChatHistory extends Model {
    use HasFactory;

    protected $fillable = [
        'history',
    ];

    public function snippet() {
        return $this->belongsTo(Snippet::class);
    }
}
