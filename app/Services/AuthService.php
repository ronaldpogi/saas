<?php

namespace App\Services;

use App\Events\TenantRegistered;
use App\Models\Tenant as TenantModel;
use App\Repositories\RoleRepository;
use App\Repositories\TenantRepository;
use App\Repositories\UserRepository;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class AuthService
{
    protected $name = 'Auth';

    public function __construct(
        protected TenantRepository $tenantRepository,
        protected UserRepository $userRepository,
        protected RoleService $roleService,
        protected RoleRepository $roleRepository,
    ) {}

    public function register(array $data): TenantModel
    {
        return DB::transaction(function () use ($data) {

            $tenantData = [
                'name'      => $data['name'],
                'address'   => $data['address'],
                'subdomain' => $data['subdomain'],
                'settings'  => $data['settings'] ?? [],
            ];

            $tenant = $this->tenantRepository->create($tenantData);

            $userData = [
                'tenant_id' => $tenant->id,
                'email'     => $data['email'],
                'phone'     => $data['phone'],
                'password'  => Hash::make($data['password']),
            ];

            $user = $this->userRepository->create($userData);

            event(new TenantRegistered($tenant, $user));

            return $tenant;
        });
    }
}
