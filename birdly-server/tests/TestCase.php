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
        bool $compareHeaders = false
    ): void {
        // Compare status codes
        $this->assertEquals(
            $expected->getStatusCode(),
            $actual->getStatusCode(),
            'Response status codes do not match'
        );

        if ($expected->status() !== 204)
            // Compare response content
            $this->assertJsonStringEqualsJsonString(
                $expected->getContent(),
                $actual->getContent(),
                'Response content does not match'
            );

        // Optionally compare headers
        if ($compareHeaders) {
            $this->assertEquals(
                $expected->headers->all(),
                $actual->headers->all(),
                'Response headers do not match'
            );
        }
    }
}
