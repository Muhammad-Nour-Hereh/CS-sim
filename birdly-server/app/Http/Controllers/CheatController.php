<?php

namespace App\Http\Controllers;

use App\Http\Requests\CheatRequest;
use App\Repositories\CheatRepo;
use App\Services\CheatFileService;

class CheatController extends Controller {
    public function __construct(
        protected CheatFileService $fileService,
        protected CheatRepo $cheat
    ) {
    }

    public function index() {
        return $this->successResponse($this->cheat->all());
    }

    public function store(CheatRequest $request) {
        $courseId = $request->input('course_id');
        $title = $request->input('title');
        $content = $request->input('content');

        $path = $this->fileService->store($courseId, $title, $content);

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
        $this->cheat->update($id, $request->input('course_id'), $request->input('title'));

        return $this->successResponse($cheat->id);
    }

    public function destroy($id) {
        $cheat = $this->cheat->delete($id);

        if (!$cheat) {
            return $this->notFoundResponse();
        }

        $this->fileService->delete($cheat->path);
        $cheat->delete();

        return $this->noContentResponse();
    }
}
