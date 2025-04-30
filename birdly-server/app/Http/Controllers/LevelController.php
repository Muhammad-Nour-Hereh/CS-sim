<?php

namespace App\Http\Controllers;

use App\Http\Requests\LevelRequest;
use App\Models\Level;

class LevelController extends Controller {

    public function index() {
        return $this->successResponse(Level::All());
    }

    public function store(LevelRequest $request) {
        Level::create($request->validated());

        return $this->createdResponse();
    }

    public function show($id) {
        $level = Level::find($id);

        if (!$level)
            return $this->notFoundResponse();

        return $this->successResponse($level);
    }
    public function update(LevelRequest $request, $id) {
        $level = Level::find($id);

        if (!$level)
            return $this->notFoundResponse();

        $level->update($request->validated());

        return $this->noContentResponse();
    }
    public function destroy($id) {
        $level = Level::find($id);

        if (!$level)
            return $this->notFoundResponse();
        
        $level->delete($id);
        return $this->noContentResponse();
    }
}
