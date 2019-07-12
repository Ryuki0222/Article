<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use \App\User;
use \App\Article;
use \App\UserArticle;

class UserArticleController extends Controller
{
    public function index($user_id)
    {
        $user_atricles = User::find($user_id)->article_ids->toArray();
        //
        $article_ids = array_column($user_atricles, 'article_id');
        $articles = Article::whereIn('id', $article_ids)->get()->toArray();
        return response()->json($articles);
    }

    public function store($user_id, Request $request)
    {
        if (!$request->title || !$request->body || !$request->description) {
            abort(404);
        }
        $article = new Article();
        $article->fill([
            'title' => $request->title,
            'body' => $request->body,
            'description' => $request->description,
            'image_path' => $request->image_path ? $request->image_path : ''
        ]);
        if (!$article->save()) {
            return response()->json([
                "done" => false
            ]);
        }
        $article_id = $article->id;

        $user_article = new UserArticle();
        $user_article->fill([
            'user_id' => $user_id,
            'article_id' => $article_id
        ]);
        return response()->json([
            "done" => $user_article->save()
        ]);
    }

    public function show($user_id, $article_id)
    {
        $article = Article::findOrFail($article_id);
        $user_article = UserArticle::where('article_id', $article->id)->first();
        if (!$user_article) {
            abort(404);
        }
        return response()->json($article->toArray());
    }

    public function edit($id)
    {
        //
    }

    public function update(Request $request, $user_id, $article_id)
    {
        // user_articles tableの更新
        $user_article = UserArticle::where('user_id', $user_id)->where('article_id', $article_id)->first();
        if (!$user_article){
            abort(404);
        }
        // articles tableの更新
        $article = Article::findOrFail($article_id);
        return response()->json([
            'done' => $article->update([
                'title' => $request->title ? $request->title : $article->title,
                'body' => $request->body ? $request->body : $article->body,
                'description' => $request->description ? $request->description : $article->description,
                'image_path' => $request->image_path ? $request->image_path : $article->image_path
            ])
        ]);
    }

    public function destroy($user_id, $article_id)
    {
        $user_article = UserArticle::where('user_id', $user_id)->where('article_id', $article_id)->first();
        if (!$user_article) {
            abort(404);
        }
        $article = Article::findOrFail($article_id);

        return response()->json([
            'done' => $article->delete() && $user_article->delete()
        ]);
    }
}
