<?php

namespace App\Repositories;

use App\Models\Progress;

class ProgressRepo {

    public function find(int $id): ?Progress {
        return Progress::find($id);
    }

    public function getMistakes(int $progressId) {
        $progress = $this->find($progressId);
        return $progress?->mistakes()->get();
    }

}
