<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class ApiResponseMiddleware
{
    public function handle(Request $request, Closure $next): Response
    {
        $response = $next($request);

        if (!$response instanceof JsonResponse) {
            return $response;
        }

        $original = $response->getData(true);

        if (isset($original['status'])) {
            return $response;
        }

        $statusCode = $response->getStatusCode();
        $isError = $statusCode >= 400;

        $payload = [
            'status' => $isError ? 'error' : 'success',
        ];

        if ($isError) {
            $payload['message'] = $original['message'] ?? 'Request failed';
            if (isset($original['errors'])) {
                $payload['errors'] = $original['errors'];
            }
        } else {
            $payload['data'] = $original;
        }

        $response->setData($payload);

        return $response;
    }
}
