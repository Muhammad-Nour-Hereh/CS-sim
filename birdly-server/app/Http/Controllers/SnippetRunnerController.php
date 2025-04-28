<?php

namespace App\Http\Controllers;

use App\Models\Snippet;
use App\Traits\ResponseTrait;
use Illuminate\Http\Request;
use Symfony\Component\Process\Process;

class SnippetRunnerController extends Controller {
    use ResponseTrait;

    public function run(Request $request, $id) {
        $snippet = $request->user()->snippets()->find($id);

        if (!$snippet) {
            return $this->failResponse('Snippet not found', 404);
        }

        if ($snippet->language !== 'python') {
            return $this->failResponse('Language not supported', 422);
        }

        $code = $snippet->code;

        $tempFile = tempnam(sys_get_temp_dir(), 'snippet_') . '.py';
        file_put_contents($tempFile, $code);

        $process = new Process(['python3', $tempFile]);
        $process->run();

        if (!$process->isSuccessful()) {
            $errorOutput = $process->getErrorOutput();
            return $this->successResponse([
                'status' => 'SyntaxError',
                'output' => $errorOutput
            ]);
        }

        $output = $process->getOutput();

        return $this->successResponse([
            'status' => 'success',
            'output' => $output
        ]);
    }
}
