<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use \App\Article;

class ArticleController extends Controller
{

    public function index()
    {
        $articles = Article::all();
        return response()->json($articles->toArray());
    }

    public function show($id)
    {
        $article = Article::findOrFail($id);
        return response()->json($article->toArray());
    }
}
