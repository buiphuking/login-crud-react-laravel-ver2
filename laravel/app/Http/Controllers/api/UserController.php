<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use DB;

class UserController extends Controller
{
    public function token(Request $request)
    {
        $loginDetails = $request->only('mssv', 'password');
        if (Auth::attempt($loginDetails)) {
            $user =  User::where("mssv", $request->mssv)->first();
            return response()->json(
                [
                    'status' => 200,
                    'user' => $user,
                    'token' => $user->createToken($user->name)->plainTextToken,
                    'message' => 'success',
                ],
            )->setStatusCode(200);
        } else {
            return response()->json(
                [
                    'status' => 501,
                    'message' => 'wrong login details',
                ]
            )->setStatusCode(501);
        }
    }
}
