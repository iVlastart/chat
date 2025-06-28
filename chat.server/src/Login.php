<?php
    class Login
    {
        private PDO $conn;

        public function __construct(Db $db,
                                    private string $username,
                                    private string $password)
        {
            $this->conn = $db->connect();
        }

        public function login():bool
        {
            if($this->username===''&&$this->password==='') return false;
            $sql = "SELECT Username, Password FROM users WHERE Username=:Username";
            $stmt = $this->conn->prepare($sql);
            $stmt->bindValue(":Username", $this->username, PDO::PARAM_STR);
            $stmt->execute();

            $result = $stmt->fetch(PDO::FETCH_ASSOC);
            if(!$result) return false;
            else
                return password_verify($this->password, $result["Password"]);
        }
    }