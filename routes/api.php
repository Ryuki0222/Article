<?php

use Illuminate\Http\Request;

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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::resource('/v1/user', 'UserController');
Route::post('/v1/user/login', 'UserController@login');
Route::get('/v1/articles', 'ArticleController@index');
Route::get('/v1/article/{id}', 'ArticleController@show');

// ユーザの登録した文献を取得
Route::get('/v1/user/{user_id}/articles', 'UserArticleController@index');
Route::get('/v1/user/{user_id}/article/{article_id}', 'UserArticleController@show');
Route::post('/v1/user/{user_id}/article', 'UserArticleController@store');
Route::put('/v1/user/{user_id}/article/{article_id}', 'UserArticleController@update');
Route::patch('/v1/user/{user_id}/article/{article_id}', 'UserArticleController@update');
Route::delete('/v1/user/{user_id}/article/{article_id}', 'UserArticleController@destroy');
