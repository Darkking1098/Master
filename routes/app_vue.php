<?php

use Illuminate\Support\Facades\Route;

Route::get('/{any}', function () {
    return view('vue');
})->where('any', '^(?!api|ajax).*');
