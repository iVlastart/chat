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
        $_SESSION['user'] = $data['username'];
        echo json_encode(["success"=>$login->login()]);
        exit;
    }
    else if($parts[1]==='signin'&&$method==='POST')
    {
        $raw_data = file_get_contents('php://input');
        $data = json_decode($raw_data, true);
        $signin = new Signin($db, htmlspecialchars($data['username'])??'',
                            htmlspecialchars($data['password'])??'');
        $_SESSION['user'] = $data['username'];
        echo json_encode(["success"=>$signin->signin()]);
        exit;
    }
    else if($parts[1]==='friends'&&$method==='GET')
    {
        if($parts[2]==="")
        {
            http_response_code(400);
            echo json_encode(["error"=>"missing username"]);
            exit;
        }
        $user = new User($db, $parts[2]);
        $result[0]=$user->getFriends();
        echo json_encode(["usernames"=>$result[0]]);
        exit;
    }

    else if($parts[1]==='addMsg'&&$method==='POST')
    {
        $raw_data = file_get_contents('php://input');
        $data = json_decode($raw_data, true);
        $user = new User($db, $data['username']);
        $userData = $user->getUserID($data['username']);
        $id = $userData['ID'];
        $msg = new Msg($db);
        $msg->addMsg($id, $data['msg']);
        exit;
    }

    else if($parts[1]==='getMsgs'&&$method==='GET')
    {
        $msg = new Msg($db);
        echo json_encode($msg->getMsgs());
        exit;
    }