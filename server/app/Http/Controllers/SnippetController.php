<?php

namespace App\Http\Controllers;

use App\Http\Requests\SnippetRequest;
use App\Models\Snippet;
use Illuminate\Http\Request;

class SnippetController extends Controller {

    public function index(Request $request) {
        $snippets = $request->user()->snippets()->latest()->get();

        return $this->successResponse($snippets);
    }

    public function store(SnippetRequest $request) {
        $snippet = Snippet::create([
            'user_id' => $request->user()->id,
            'title' => $request->input('title'),
            'language' => $request->input('language'),
            'code' => $request->input('code'),
        ]);

        return $this->successResponse($snippet, 201);
    }

    public function show(Request $request, $id) {
        $snippet = Snippet::where('id', $id)
            ->where('user_id', $request->user()->id)
            ->first();

        if (!$snippet) {
            return $this->failResponse('Snippet not found', 404);
        }

        return $this->successResponse($snippet);
    }

    public function update(SnippetRequest $request, $id) {
        $snippet = Snippet::where('id', $id)
            ->where('user_id', $request->user()->id)
            ->first();

        if (!$snippet) {
            return $this->failResponse('Snippet not found', 404);
        }

        $snippet->update([
            'title' => $request->input('title'),
            'language' => $request->input('language'),
            'code' => $request->input('code'),
        ]);

        return $this->successResponse($snippet);
    }

    public function destroy(Request $request, $id) {
        $snippet = Snippet::where('id', $id)
            ->where('user_id', $request->user()->id)
            ->first();

        if (!$snippet) {
            return $this->failResponse('Snippet not found', 404);
        }

        $snippet->delete();

        return $this->noContentResponse();
    }
}
