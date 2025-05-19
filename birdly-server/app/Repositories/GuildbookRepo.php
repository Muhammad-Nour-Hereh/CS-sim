<?php

namespace App\Repositories;

use App\Models\Guildbook;

class GuildbookRepo {

    public function all() {
        return Guildbook::all();
    }

    public function find(int $id) {
        return Guildbook::find($id);
    }


}
