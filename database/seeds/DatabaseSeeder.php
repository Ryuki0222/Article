<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // $this->call(UsersTableSeeder::class);
        DB::table('users')->insert([
            'name' => 'root',
            'email' => 'root@example.com',
            'password' => 'root'
        ]);

        DB::table('articles')->insert([
            'id' => 1,
            'title' => '世界のあいさつ①',
            'body' => "hello world\ngood morning",
            'description' => 'hello article',
            'image_path' => 'icon1.png'
        ]);

        DB::table('articles')->insert([
            'id' => 2,
            'title' => '世界のあいさつ②',
            'body' => "にーはお\nににーはお",
            'description' => 'chinese',
            'image_path' => 'icon2.png'
        ]);

        DB::table('articles')->insert([
            'id' => 3,
            'title' => '世界のDJ',
            'body' => "martin garix\nzedd\nthe chain smokers\ntiest\narmin van barren",
            'description' => 'dj',
            'image_path' => 'icon3.png'
        ]);

        DB::table('user_articles')->insert([
            'user_id' => 1,
            'article_id' => 1
        ]);

        DB::table('user_articles')->insert([
            'user_id' => 1,
            'article_id' => 2
        ]);

        DB::table('user_articles')->insert([
            'user_id' => 1,
            'article_id' => 3
        ]);

    }
}
