<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\TenantRequest;
use App\Http\Resources\TenantResource;
use App\Repositories\TenantRepository;
use App\Services\TenantService;
use Illuminate\Http\JsonResponse;

class TenantController extends Controller
{
    protected $name = 'Tenant';

    public function __construct(
        protected TenantRepository $repository,
        protected TenantService $service,
    ) {}

    public function index(): JsonResponse
    {
        $tenant = $this->repository->all();

        return response()->success(TenantResource::collection($tenant), __('messages.fetched', ['resource' => $this->name]));
    }

    public function store(TenantRequest $request): JsonResponse
    {
        $tenant = $this->service->create($request->validated());

        return response()->success(new TenantResource($tenant), __('messages.created', ['resource' => $this->name]), 201);
    }

    public function show(string $id): JsonResponse
    {
        $tenant = $this->repository->find($id);

        return response()->success(new TenantResource($tenant), __('messages.fetched', ['resource' => $this->name]));
    }

    public function update(TenantRequest $request, string $id): JsonResponse
    {
        $tenant = $this->repository->update($id, $request->validated());

        return response()->success(new TenantResource($tenant), __('messages.updated', ['resource' => $this->name]));
    }

    public function destroy(string $id): JsonResponse
    {
        $this->repository->delete($id);

        return response()->success([], __('messages.deleted', ['resource' => $this->name]), 204);
    }
}
