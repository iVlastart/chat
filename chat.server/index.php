<?php
    use Dotenv\Dotenv;

    spl_autoload_register(function($class){
        require_once __DIR__ . "/src/$class.php"; 
    });
    require_once __DIR__ . '/vendor/autoload.php';
    header('Content-Type: application/json');

    $dotenv = Dotenv::createImmutable(__DIR__);
    $dotenv->load();

    $parts = explode('/', $_SERVER["REQUEST_URI"]);
    $method = $_SERVER['REQUEST_METHOD'];

    $db = new Db($_ENV["HOSTNAME"], $_ENV["DBNAME"],
                $_ENV["USERNAME"], $_ENV["PASSWORD"]);

    if($parts[1]==='login'&&$method==='POST')
    {
        
    }