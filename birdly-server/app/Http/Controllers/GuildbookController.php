<?php

namespace App\Http\Controllers;

use App\Http\Requests\GuildbookRequest;
use App\Models\Guildbook;
use App\Repositories\GuildbookRepo;
use App\Services\GuildbookFileService;
use Illuminate\Support\Facades\Storage;

class GuildbookController extends Controller {

    public function __construct(
        protected GuildbookFileService $fileService,
        protected GuildbookRepo $repo
    ) {
    }

    public function index() {
        return $this->successResponse($this->repo->all());
    }

    public function store(GuildbookRequest $request) {
        $courseId = $request->input('course_id');
        $title = $request->input('title');
        $content = $request->input('content');

        $path = $this->fileService->store($courseId, $title, $content);
        if (!$path) return $this->notFoundResponse();

        $this->repo->create($courseId, $title, $path);
        return $this->createdResponse();
    }

    public function show($id) {
        $guildbook = $this->repo->find($id);
        if (!$guildbook || !Storage::exists($guildbook->path)) {
            return $this->notFoundResponse();
        }

        $content = $this->fileService->read($guildbook->path);
        return $this->successResponse([
            'id'        => $guildbook->id,
            'title'     => $guildbook->title,
            'course_id' => $guildbook->course_id,
            'content'   => $content,
        ]);
    }

    public function update(GuildbookRequest $request, $id) {
        $guildbook = $this->repo->find($id);
        if (!$guildbook) return $this->notFoundResponse();

        $this->fileService->update($guildbook->path, $request->input('content'));
        $this->repo->update($id, $request->input('course_id'), $request->input('title'));

        return $this->noContentResponse();
    }

    public function destroy($id) {
        $path = $this->repo->delete($id);
        if (!$path) return $this->notFoundResponse();

        $this->fileService->delete($path);
        return $this->noContentResponse();
    }
}
