<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <meta name="csrf-token" content="{{ csrf_token() }}" >
        <title>Laravel</title>

        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css?family=Nunito:200,600" rel="stylesheet">
        <style>
            body {
                background: #f3f3f3;
                width: 100%;
                height: 100%;
            }

            .main {
                text-align: center;
                margin: 0 auto;
                margin-top: 0%;
                width: 60%;
                background: #ffffff;
            }

            .title_header {
                padding-top: 30px;
                padding-bottom: 30px;
                padding-left: 20px;
                padding-right: 20px;
            }
        </style>
    </head>
    <body>
        <div class="main" id="main">
            <h1 class="title_header">Articles</h1>

            <div class="primary">
            </div>
        </div>
        <script src="{{ asset('js/app.js')}}"></script>
    </body>
</html>
