<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class UserArticle extends Model
{
    //
    protected $fillable = [
        'user_id',
        'article_id'
    ];

    protected $hidden = [
        'id',
        'created_at'
    ];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime'
    ];

    protected $primaryKey = 'id';

    public function belongs_user() {
        return $this->belongsTo('App\User');
    }

    public function belongs_article() {
        return $this->belongsTo('App\Article');
    }
}
