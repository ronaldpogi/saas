<?php

namespace App\Repositories;

use App\Models\Permission;
use App\Repositories\TModel;

class PermissionRepository extends TModel
{
    public function __construct(Permission $permission)
    {
        parent::__construct($permission);
    }
}
