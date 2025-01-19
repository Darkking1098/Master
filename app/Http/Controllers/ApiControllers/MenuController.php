<?php

namespace App\Http\Controllers\ApiControllers;

use Mantis\Controllers\MantisController;
use App\Models\Menu;

class MenuController extends MantisController
{
    function get_menu($type)
    {
        $menu = Menu::with(['visibleItems'])->where('title', $type)->first();
        return self::api(self::success(["menu" => $menu]));
    }
}
