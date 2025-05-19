<?php

namespace App\Repositories;

class SnippetRepo {
    
    public function all(User $user) {
        return $user->snippets;
    }
}
