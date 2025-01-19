<?php

use App\Http\Controllers\ApiControllers\MenuController;
use Illuminate\Support\Facades\Route;

Route::get('menu/{menu}', [MenuController::class, "get_menu"]);
