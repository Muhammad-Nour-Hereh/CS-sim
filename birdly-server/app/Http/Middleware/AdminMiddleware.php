<?php

namespace App\Http\Middleware;

use App\Traits\ResponseTrait;
use Closure;
use Exception;
use Illuminate\Http\Request;
use PHPOpenSourceSaver\JWTAuth\Facades\JWTAuth;
use Symfony\Component\HttpFoundation\Response;

class AdminMiddleware {
    use ResponseTrait;

    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response {

        try {

            JWTAuth::parseToken()->authenticate();
            $user = JWTAuth::user();

            if ($user->user_type !== 'admin') {
                return $this->forbiddenResponse();
            }
        } catch (Exception) {
            return $this->unauthorizedResponse();
        }
        return $next($request);
    }
}
