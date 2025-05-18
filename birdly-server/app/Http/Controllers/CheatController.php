<?php

namespace App\Http\Controllers;

use App\Http\Requests\CheatRequest;
use App\Models\Cheat;
use App\Repositories\CheatRepo;
use App\Services\CheatFileService;

class CheatController extends Controller {
    public function __construct(
        protected CheatFileService $fileService,
        protected CheatRepo $cheat
    ) {
    }

    public function index() {
        return $this->successResponse(Cheat::all());
    }

    public function store(CheatRequest $request) {
        $path = $this->fileService->store(
            $courseId = $request->input('course_id'),
            $title = $request->input('title'),
            $request->input('content')
        );

        if (!$path) return $this->notFoundResponse();
        $id = $this->cheat->create($courseId, $title, $path);

        return $this->createdResponse($id);
    }

    public function show($id) {
        $cheat = $this->cheat->find($id);

        if (!$cheat) {
            return $this->notFoundResponse();
        }

        $content = $this->fileService->read($cheat->path);

        if (!$content) {
            return $this->notFoundResponse();
        }

        return $this->successResponse([
            'id'        => $cheat->id,
            'title'     => $cheat->title,
            'course_id' => $cheat->course_id,
            'content'   => $content,
        ]);
    }

    public function update(CheatRequest $request, $id) {
        $cheat = $this->cheat->find($id);

        if (!$cheat) {
            return $this->notFoundResponse();
        }

        $this->fileService->update($cheat->path, $request->input('content'));

        $cheat->update([
            'course_id' => $request->input('course_id'),
            'title'     => $request->input('title'),
        ]);

        return $this->successResponse($cheat->id);
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
