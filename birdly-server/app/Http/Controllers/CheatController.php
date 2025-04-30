<?php

namespace App\Http\Controllers;

use App\Http\Requests\CheatRequest;
use App\Models\Cheat;
use App\Services\CheatFileService;

class CheatController extends Controller {
    public function __construct(protected CheatFileService $fileService) {
    }

    public function index() {
        return $this->successResponse(Cheat::all());
    }

    public function store(CheatRequest $request) {
        $path = $this->fileService->store(
            $request->input('course_id'),
            $request->input('title'),
            $request->input('content')
        );

        if (!$path) {
            return $this->notFoundResponse();
        }

        Cheat::create([
            'course_id' => $request->input('course_id'),
            'title'     => $request->input('title'),
            'path'      => $path,
        ]);

        return $this->createdResponse();
    }

    public function show($id) {
        $Cheat = Cheat::find($id);

        if (!$Cheat) {
            return $this->notFoundResponse();
        }

        $content = $this->fileService->read($Cheat->path);

        return $this->successResponse([
            'id'        => $Cheat->id,
            'title'     => $Cheat->title,
            'course_id' => $Cheat->course_id,
            'content'   => $content,
        ]);
    }

    public function update(CheatRequest $request, $id) {
        $Cheat = Cheat::find($id);

        if (!$Cheat) {
            return $this->notFoundResponse();
        }

        $this->fileService->update($Cheat->path, $request->input('content'));

        $Cheat->update([
            'course_id' => $request->input('course_id'),
            'title'     => $request->input('title'),
        ]);

        return $this->noContentResponse();
    }

    public function destroy($id) {
        $Cheat = Cheat::find($id);

        if (!$Cheat) {
            return $this->notFoundResponse();
        }

        $this->fileService->delete($Cheat->path);
        $Cheat->delete();

        return $this->noContentResponse();
    }
}
