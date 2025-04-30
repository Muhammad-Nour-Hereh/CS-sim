<?php

namespace App\Http\Controllers;

use App\Http\Requests\GuildbookRequest;
use App\Models\Course;
use App\Models\Guildbook;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class GuildbookController extends Controller {
    public function index() {
        $guildbooks = Guildbook::all();
        return $this->successResponse($guildbooks);
    }

    public function store(GuildbookRequest $request) {

        $course = Course::find($request->input('course_id'));
        $courseSlug = Str::slug($course->title);
        $titleSlug = Str::slug($request->input('title'));
        $filePath = "$courseSlug/guildbooks/$titleSlug.mdx";

        Storage::put($filePath, $request->input('content'));

        Guildbook::create([
            'course_id' => $course->id,
            'title'     => $request->input('title'),
            'path'      => $filePath,
        ]);

        return $this->createdResponse();
    }

    public function show($id) {
        $guildbook = Guildbook::find($id);

        if (!$guildbook)
            return $this->notfountResponse();

        $content = Storage::get($guildbook->path);

        return $this->successResponse([
            'id'      => $guildbook->id,
            'title'   => $guildbook->title,
            'course_id' => $guildbook->course_id,
            'content' => $content,
        ]);
    }

    public function update(GuildbookRequest $request, $id) {
        $guildbook = Guildbook::find($id);

        if (!$guildbook)
            return $this->notfountResponse();

        $course = Course::find($request->input('course_id'));
        $courseSlug = Str::slug($course->title);
        $titleSlug = Str::slug($request->input('title'));

        // Delete the old file
        Storage::delete($guildbook->path);

        // Write new content
        Storage::put($guildbook->path, $request->input('content'));

        // Update model
        $guildbook->update([
            'course_id' => $course->id,
            'title'     => $request->input('title'),
        ]);

        return $this->noContentResponse();
    }

    public function destroy($id) {
        $guildbook = Guildbook::find($id);

        if (!$guildbook)
            return $this->notfountResponse();

        Storage::delete($guildbook->path);
        $guildbook->delete();

        return $this->noContentResponse();
    }
}
