<?php

namespace App\Http\Controllers;

use App\Http\Requests\SnippetRequest;
use App\Models\Snippet;
use App\Repositories\SnippetRepo;
use Illuminate\Http\Request;

class SnippetController extends Controller {
    public function __construct(protected SnippetRepo $snippets) {
    }


    public function index(Request $request) {
        $snippets = $request->user()->snippets;

        return $this->successResponse($snippets);
    }

    public function store(SnippetRequest $request) {

        Snippet::create([
            'user_id' => $request->user()->id,
            'title' => $request->input('title'),
            'language' => $request->input('language'),
            'code' => $request->input('code'),
        ]);

        return $this->createdResponse();
    }

    public function show(Request $request, $id) {
        $snippet = $request->user()->snippets()->find($id);

        if (!$snippet)
            return $this->failResponse('Snippet not found', 404);


        return $this->successResponse($snippet);
    }

    public function update(SnippetRequest $request, $id) {
        $snippet = $request->user()->snippets()->find($id);

        if (!$snippet)
            return $this->failResponse('Snippet not found', 404);


        $snippet->update([
            'title' => $request->input('title'),
            'language' => $request->input('language'),
            'code' => $request->input('code'),
        ]);

        return $this->noContentResponse();
    }

    public function destroy(Request $request, $id) {
        $snippet = $request->user()->snippets()->whereKey($id)->first();

        if (!$snippet)
            return $this->failResponse('Snippet not found', 404);


        $snippet->delete();

        return $this->noContentResponse();
    }
}
