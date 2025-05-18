<?php

namespace App\Http\Controllers;

use App\Services\SnippetRunnerService;
use App\Traits\ResponseTrait;
use Illuminate\Http\Request;

class SnippetRunnerController extends Controller {
    use ResponseTrait;

    public function __construct(protected SnippetRunnerService $runner) {
        $this->runner = $runner;
    }

    public function run(Request $request) {
        $code = $request->code;

        $request->validate(
            ['code' => 'required|string']
        );

        $result = $this->runner->run($code);

        return $this->successResponse($result);
    }

    public function runSnippet(Request $request, $id) {
        $snippet = $request->user()->snippets()->find($id);

        if (!$snippet) {
            return $this->failResponse('Snippet not found', 404);
        }

        $result = $this->runner->run($snippet->code);

        return $this->successResponse($result);
    }
}
