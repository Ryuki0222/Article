# README
## environment
name | version
--: | --:
php | 7.1.x
mysql | 5.6.x
laravel | 5.8.26

### build enviroment
1. install composer
```
$ php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"

$ php -r "if (hash_file('SHA384', 'composer-setup.php') === '544e09ee996cdf60ece3804abc52599c22b1f40f4323403c44d44fdfdd586475ca9813a858088ffbc1f233e9b180f061') { echo 'Installer verified'; } else { echo 'Installer corrupt'; unlink('composer-setup.php'); } echo PHP_EOL;"

$ php composer-setup.php

$ php -r "unlink('composer-setup.php');"
```
2. move composer
```
$ mv composer.phar /usr/local/bin/composer
```
3. clone this project
```
git clone https://github.com/Ryuki0222/Article.git
```

4. start server
```
$ php artisan serve
```

- create laravel project
```
$ composer create-project laravel/laravel --prefer-dist {project_name}
```

## DataBase
### config
name | value
:-- | :--
port | 3306
DB_NAME | Article

### tables
- user
- article
- user_article

## table's column
### users
column | type | description
:-- | :-- | :--
id | int | primary key and user_id
name | string | name of user
email | stirng | user's email
password | string | user's password
created_at | timestamp | 
updated_at | timestamp | 

### articles
column | type | description
:-- | :-- | :--
id | int | primary key and article_id
title | string | title of article
body | string | body of article
description | string | description of article
image_path | string | path of article's image
created_at | timestamp | 
updated_at | timestamp | 

### user_articles
column | type | description
:-- | :-- | :--
id | int | primary key
user_id | int | belongs to users
article_id | int | belongs to articles
created_at | timestamp | 
updated_at | timestamp | 

## api
### login
```
post {url}/api/v1/user/login
```
#### params

name | type | require/optional | paramType
:-- | :-- | :-- | :--
email | string | require | body
password | string | require | body

#### response
```
{
    "is_created": true
}
```

### sign up
```
post {url}/api/v1/user/sign_up
```
#### params

name | type | require/optional | paramType
:-- | :-- | :-- | :--
email | string | require | body
password | string | require | body

#### response
```
{
    "is_authenticate": true 
}
```

### get user info
```
get {url}/api/v1/user/{user_id}
```
#### params
name | type | require/optional | paramType
:-- | :-- | :-- | :--
user_id | int | require | path

#### response
```
{
    "name": "username",
    "email": "passowrd"
}
```
### patch user info
```
patch {url}/api/v1/user/{user_id}
```

#### params
name | type | require/optional | paramType
:-- | :-- | :-- | :--
user_id | int | require | path
name | string | optional | params
email | string | optional | params
password | string | optional | params

#### response
```
{
    "name": "username",
    "email": "passowrd"   
}
```

### delete user info
```
patch {url}/api/v1/user/{user_id}
```

#### params
name | type | require/optional | paramType
:-- | :-- | :-- | :--
user_id | int | require | path

#### response
```
{
    "done": true
}
```

### get articles
```
get {url}/api/v1/articles
```
#### params
- none
#### response
```
{
    articles: [
        {
            "id": 1,
            "title": "article1",
            "description": "desc1",
            "image_path": "aaa.png",
            "created_at": "0000/00/00",
            "updated_at": "0000/00/00"
        },
        {
            "id": 2,
            "title": "article2",
            "description": "desc2",
            "image_path": "bbb.png",
            "created_at": "9999/99/99",
            "updated_at": "9999/99/99"
        },
        
    ]
}
```

### get a article
```
get {url}/api/v1/article/{article_id}
```
#### params
name | type | require/optional | paramType
:-- | :-- | :-- | :--
article_id | int | require | path

#### response
```
{
            "id": 2,
            "title": "article2",
            "body": "body2",
            "image_path": "bbb.png",
            "created_at": "9999/99/99",
            "updated_at": "9999/99/99"
        },
```

### create a aritcle
```
post {url}/api/v1/atricle
```
#### params
name | type | require/optional | paramType
:-- | :-- | :-- | :--
title | string | require | body
body | string | require | body
description | string | require | body
image_path | string | require | body
user_id | string | require | body

#### response
```
    "done": true
```


#### patch a article
```
patch {url}/api/v1/atricle/{article_id}
```
#### params
name | type | require/optional | paramType
:-- | :-- | :-- | :--
article_id | string | require | path
title | string | optional | body
body | string | optional | body
description | string | optional | body
image_path | string | optional | body
user_id | string | require | params

#### response
```
{
    "done": true
}
```

#### delete a article
```
delete {url}/api/v1/atricle/{aritcle_id}
```

#### params
name | type | require/optional | paramType
:-- | :-- | :-- | :--
article_id | string | require | path
user_id | string | require | params

#### response
```
{
    "done": true
}
```
