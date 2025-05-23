<?php

namespace App\Http\Controllers;

use App\Http\Requests\SnippetRequest;
use App\Repositories\SnippetRepo;
use Illuminate\Http\Request;

class SnippetController extends Controller {
    public function __construct(protected SnippetRepo $snippets) {
    }

    public function index(Request $request) {
        return $this->successResponse($this->snippets->all($request->user()));
    }

    public function store(SnippetRequest $request) {
        $this->snippets->create($request->user(), $request->only('title', 'language', 'code'));
        return $this->createdResponse();
    }

    public function show(Request $request, $id) {
        $snippet = $this->snippets->find($request->user(), $id);
        if (!$snippet) return $this->failResponse('Snippet not found', 404);
        return $this->successResponse($snippet);
    }

    public function update(SnippetRequest $request, $id) {
        $snippet = $this->snippets->update($request->user(), $id, $request->only('title', 'language', 'code'));
        if (!$snippet) return $this->failResponse('Snippet not found', 404);
        return $this->noContentResponse();
    }
    
    public function destroy(Request $request, $id) {
        $deleted = $this->snippets->delete($request->user(), $id);
        if (!$deleted) return $this->failResponse('Snippet not found', 404);
        return $this->noContentResponse();
    }
}
