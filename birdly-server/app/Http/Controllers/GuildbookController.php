<?php

namespace App\Http\Controllers;

use App\Http\Requests\GuildbookRequest;
use App\Models\Guildbook;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class GuildbookController extends Controller {
    public function index() {
        $guildbooks = Guildbook::all();
        return $this->successResponse($guildbooks);
    }

    public function store(GuildbookRequest $request) {
        $title = $request->input('title');
        $filename = Str::slug($title) . '.mdx';
        $path = "guildbooks/{$filename}";

        Storage::put($path, $request->input('content'));

        $guildbook = Guildbook::create([
            'title' => $title,
            'path' => $path,
            'course_id' => $request->input('course_id'),
        ]);

        return $this->createdResponse();
    }

    public function update(GuildbookRequest $request, $id) {
        $guildbook = Guildbook::find($id);

        if (!$guildbook)
            return $this->notfountResponse();

        if ($request->has('content')) {
            Storage::put($guildbook->file_path, $request->input('content'));
        }

        $guildbook->title = $request->input('title');
        $guildbook->course_id = $request->input('course_id');
        $guildbook->save();

        return $this->noContentResponse();
    }

    public function show($id) {
        $guildbook = Guildbook::find($id);

        if (!$guildbook)
            return $this->notfountResponse();

        $content = Storage::get($guildbook->file_path);

        return $this->successResponse([
            'id' => $guildbook->id,
            'title' => $guildbook->title,
            'content' => $content,
        ]);
    }

    public function destroy($id) {
        $guildbook = Guildbook::find($id);

        if (!$guildbook)
            return $this->notfountResponse();

        Storage::delete($guildbook->file_path);
        $guildbook->delete();

        return $this->noContentResponse();
    }
}
