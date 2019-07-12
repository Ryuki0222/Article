<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use \App\User;
use \App;

class UserController extends Controller
{
    public function index()
    {
        return response()->json([
            'message' => 'can not access'
        ]);
    }

    public function login(Request $request)
    {
        if (!$request->email || !$request->password) {
            abort(404);
        }

        $email = $request->email;
        $password = $request->password;

        $user = User::where('email', $email)->where('password', $password)->first();
        if (!$user) {
            abort(404);
        }

        return response()->json([
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email
        ]);
    }

    public function store(Request $request)
    {
        if (!$request->name || !$request->email || !$request->password) {
            abort(404);
        }
        $user = new User();
        $user->fill([
            'name' => $request->name,
            'email' => $request->email,
            'password' => $request->password
        ]);
        return [
            'done' => $user->save()
        ];
    }

    public function show($id)
    {
        $user = User::findOrFail($id);
        return response()->json([
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email
        ]);
    }

    public function update(Request $request, $id)
    {
        $user = User::findOrFail($id);

        return response()->json([
            'done' => $user->update([
                'name' => $request->name ? $request->name : $user->name,
                'email' => $request->email ? $request->email : $user->name,
                'password' => $request->password ? $request->password : $user->name
            ])
        ]);
    }

    public function destroy($id)
    {
        $user = User::findOrFail($id);

        return response()->json([
            'done' => $user->delete()
        ]);
    }
}
