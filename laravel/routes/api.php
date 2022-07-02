<?php

use App\Http\Controllers\api\ItemController;
use App\Http\Controllers\api\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post("/token", [UserController::class, "token"]);
Route::get('/item/list', [ItemController::class, 'index']);
Route::post('/item/add', [ItemController::class, 'store']);
Route::get('/item/edit/{id}', [ItemController::class, 'edit']);
Route::put('/item/update/{id}', [ItemController::class, 'update']);
Route::delete('/item/delete/{id}', [ItemController::class, 'destroy']);
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
