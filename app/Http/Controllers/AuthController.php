<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Http\Resources\TenantResource;
use App\Http\Resources\UserResource;
use App\Models\User;
use App\Services\AuthService;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function __construct(
        protected AuthService $service
    ) {}

    public function register(RegisterRequest $request): JsonResponse
    {
        $user = $this->service->register($request->validated());

        return response()->success(new TenantResource($user), __('auth.registered'), 201);
    }

    public function login(LoginRequest $request): JsonResponse
    {
        $user = User::where('email', $request->validated()['email'])->first();

        if (! $user || ! Hash::check($request->validated()['password'], $user->password)) {
            return response()->error(__('auth.invalid'), 401);
        }

        $token = $user->createToken('token')->plainTextToken;

        return response()->success([
            'user'  => new UserResource($user),
            'token' => $token,
        ], __('auth.logged_in'));
    }

    public function logout(): JsonResponse
    {
        Auth::user()->tokens()->delete();

        return response()->success(null, __('auth.logged_out'));
    }

    public function me(): JsonResponse
    {
        return response()->success(new UserResource(Auth::user()), __('auth.retrieved'));
    }
}
