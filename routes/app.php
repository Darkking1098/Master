<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('user.index');
});
Route::get('about', function () {
    return view('user.about');
});
