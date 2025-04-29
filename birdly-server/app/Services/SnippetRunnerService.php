<?php

namespace App\Services;

use Symfony\Component\Process\Process;

class SnippetRunnerService {
    public function run(string $code): array {
        $tempFile = tempnam(sys_get_temp_dir(), 'snippet_') . '.py';
        file_put_contents($tempFile, $code);

        $process = new Process(['python3', $tempFile]);
        $process->run();

        if (!$process->isSuccessful()) {
            return [
                'status' => 'SyntaxError',
                'output' => $process->getErrorOutput()
            ];
        }

        return [
            'status' => 'success',
            'output' => $process->getOutput()
        ];
    }
}
