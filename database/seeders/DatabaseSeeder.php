<?php

namespace Database\Seeders;

use App\Enums\Role as EnumsRole;
use App\Models\Permission;
use App\Models\Role;
use App\Models\Tenant;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        DB::transaction(function () {
            // Loop for 10 tenants
            for ($i = 1; $i <= 10; $i++) {
                $tenant = Tenant::firstOrCreate(
                    ['subdomain' => "tenant{$i}"],
                    [
                        'name'      => "Tenant {$i}",
                        'address'   => 'N/A',
                        'subdomain' => "tenant{$i}",
                        'settings'  => [],
                    ]
                );

                // Create TENANT owner user
                $tenantUser = User::firstOrCreate(
                    ['email' => "tenant{$i}@email.com"],
                    [
                        'tenant_id'  => $tenant->id,
                        'first_name' => "Tenant {$i} Owner",
                        'last_name'  => 'N/A',
                        'phone'      => '',
                        'address'    => 'N/A',
                        'password'   => bcrypt('password'),
                    ]
                );

                // Create 20 members per tenant
                for ($j = 1; $j <= 20; $j++) {
                    $memberUser = User::firstOrCreate(
                        ['email' => "tenant{$i}_member{$j}@email.com"],
                        [
                            'tenant_id'  => $tenant->id,
                            'first_name' => "Tenant {$i} Member {$j}",
                            'last_name'  => 'N/A',
                            'phone'      => '',
                            'address'    => 'N/A',
                            'password'   => bcrypt('password'),
                        ]
                    );
                }

                // Create permissions from routes (tenant scoped)
                foreach (\Route::getRoutes() as $route) {
                    if (
                        ($name = $route->getName())            && ! str_starts_with($name, 'generated::') && // Ignore auto-generated names
                        ! str_starts_with($name, 'sanctum.')   && // Ignore Laravel/Sanctum
                        ! str_starts_with($name, 'ignition.')  && // Ignition (error pages)
                        ! str_starts_with($name, 'telescope.') && // Telescope (if enabled)
                        ! str_starts_with($name, 'livewire.')           // Livewire internal
                    ) {
                        Permission::firstOrCreate([
                            'name'      => $name,
                            'tenant_id' => $tenant->id,
                        ]);
                    }
                }

                // Create roles from enum (tenant scoped)
                foreach (EnumsRole::cases() as $roleCase) {
                    Role::firstOrCreate([
                        'name'      => $roleCase->value,
                        'tenant_id' => $tenant->id,
                    ]);
                }

                // Assign roles & permissions
                $tenantRole = Role::where('name', EnumsRole::TENANT->value)->where('tenant_id', $tenant->id)->first();
                $memberRole = Role::where('name', EnumsRole::MEMBER->value)->where('tenant_id', $tenant->id)->first();

                if ($tenantRole) {
                    $tenantPermissions = Permission::where('tenant_id', $tenant->id)
                        ->pluck('id')
                        ->toArray();

                    $tenantRole->permissions()->sync($tenantPermissions);
                    $tenantUser->roles()->sync([$tenantRole->id]);
                }

                if ($memberRole) {
                    $memberPermissions = Permission::where('tenant_id', $tenant->id)
                        ->whereIn('name', [
                            'users.index',
                            'users.show',
                        ])
                        ->pluck('id')
                        ->toArray();

                    $memberRole->permissions()->sync($memberPermissions);

                    // Sync member roles to ALL member users
                    User::where('tenant_id', $tenant->id)
                        ->where('email', 'like', "tenant{$i}_member%@%")
                        ->each(fn ($user) => $user->roles()->sync([$memberRole->id]));
                }
            }
        });
    }
}
