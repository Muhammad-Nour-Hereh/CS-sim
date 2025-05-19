<?php

namespace App\Repositories;

use App\Models\Snippet;
use App\Models\User;

class SnippetRepo {

    public function all(User $user) {
        return $user->snippets;
    }

    public function create(User $user, array $data) {
        return Snippet::create([
            'user_id' => $user->id,
            ...$data,
        ]);
    }

    public function find(User $user, $id) {
        return $user->snippets()->find($id);
    }
}
