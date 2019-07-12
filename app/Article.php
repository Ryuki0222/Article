<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Article extends Model
{

    protected $fillable = [
        'title',
        'body',
        'description',
        'image_path'
    ];

    protected $hidden = [
        'created_at'
    ];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime'
    ];

    protected $primaryKey = 'id';

    public function user_id() {
        return $this->hasOne('App\UserArticle');
    }
}
