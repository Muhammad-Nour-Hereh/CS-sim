<?php

namespace Tests;

use Illuminate\Foundation\Testing\TestCase as BaseTestCase;
use Illuminate\Testing\TestResponse;

abstract class TestCase extends BaseTestCase {

    /**
     * Assert that two responses are equal
     *
     * @param \Illuminate\Testing\TestResponse $actual
     * @param \Illuminate\Http\JsonResponse $expected
     * @param bool $compareHeaders Whether to compare headers
     */
    protected function assertEqualsResponse(
        TestResponse $actual,
        $expected,
        bool $compareHeaders = false,
        array $ignoreFields = []
    ): void {
        // Compare status codes
        $this->assertEquals(
            $expected->getStatusCode(),
            $actual->getStatusCode(),
            'Response status codes do not match'
        );

        if ($expected->status() !== 204) {
            $expectedContent = json_decode($expected->getContent(), true);
            $actualContent = json_decode($actual->getContent(), true);

            foreach ($ignoreFields as $path) {
                $this->forgetPath($expectedContent, $path);
                $this->forgetPath($actualContent, $path);
            }

            $this->assertJsonStringEqualsJsonString(
                json_encode($expectedContent),
                json_encode($actualContent),
                'Response content does not match'
            );
        }

        // Optionally compare headers
        if ($compareHeaders) {
            $this->assertEquals(
                $expected->headers->all(),
                $actual->headers->all(),
                'Response headers do not match'
            );
        }
    }

    private function forgetPath(array &$array, string $path): void {
        $keys = explode('/', $path);
        $temp = &$array;

        foreach ($keys as $i => $key) {
            if (!isset($temp[$key])) {
                return; // If path doesn't exist, silently skip
            }

            if ($i === count($keys) - 1) {
                unset($temp[$key]); // Found, unset
                return;
            }

            $temp = &$temp[$key];
        }
    }
}
