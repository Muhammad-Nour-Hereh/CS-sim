<?php

namespace App\Http\Middleware;

use App\Traits\ResponseTrait;
use Closure;
use Exception;
use Illuminate\Http\Request;
use PHPOpenSourceSaver\JWTAuth\Facades\JWTAuth;
use Symfony\Component\HttpFoundation\Response;

class JwtMiddleware {
    use ResponseTrait;

    public function handle(Request $request, Closure $next): Response {
        try {
            JWTAuth::parseToken()->authenticate();
        } catch (Exception $e) {
            return $this->unauthorizedResponse();
        }

        return $next($request);
    }
}
