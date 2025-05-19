<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\Pivot;

class UserCourse extends Pivot {

    public function progress() {
        return $this->hasOne(Progress::class);
    }
}
