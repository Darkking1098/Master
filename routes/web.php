<?php

use Illuminate\Support\Facades\Route;

$file = __DIR__ . "/app";

if (config('app.type') == "inertia_react") {
    $file .= "_inertia_react";
} else if (config('app.type') == "inertia_vue") {
    $file .= "_inertia_vue";
} else if (config('app.type') == "react") {
    $file .= "_react";
} else if (config('app.type') == "vue") {
    $file .= "_vue";
}

Route::prefix('')->group($file . ".php");

Route::withoutMiddleware('web')->prefix('api')->group(__DIR__ . "/api.php");
