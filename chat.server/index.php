<?php
    use Dotenv\Dotenv;

    spl_autoload_register(function($class){
        require_once __DIR__ . "/src/$class.php"; 
    });
    require_once __DIR__ . '/vendor/autoload.php';
    header('Content-Type: application/json');
    header("Access-Control-Allow-Origin: http://localhost:5173");
    header("Access-Control-Allow-Headers: Content-Type");
    header("Access-Control-Allow-Methods: GET, POST");
    header("Access-Control-Allow-Credentials: true");

    $dotenv = Dotenv::createImmutable(__DIR__);
    $dotenv->load();

    $parts = explode('/', $_SERVER["REQUEST_URI"]);
    $method = $_SERVER['REQUEST_METHOD'];

    $db = new Db($_ENV["HOSTNAME"], $_ENV["DBNAME"],
                $_ENV["USERNAME"], $_ENV["PASSWORD"]);

    if($parts[1]==='login'&&$method==='POST')
    {
        $raw_data = file_get_contents('php://input');
        $data = json_decode($raw_data,true);
        $login = new Login($db, htmlspecialchars($data['username'])??'', 
                            htmlspecialchars($data['password'])??'');
        echo json_encode(["success"=>$login->login()]);
        exit;
    }
    else if($parts[1]==='signin'&&$method==='POST')
    {
        $raw_data = file_get_contents('php://input');
        $data = json_decode($raw_data, true);
        $signin = new Signin($db, htmlspecialchars($data['username'])??'',
                            htmlspecialchars($data['password'])??'');
        echo json_encode(["success"=>$signin->signin()]);
        exit;
    }
    else if($parts[1]==='getUser'&&$method==='GET')
    {
        if($parts[2]==="")
        {
            http_response_code(400);
            echo json_encode(["error"=>"empty username"]);
            exit;
        }
        $user = new User($db, $parts[2]);
        exit;
    }