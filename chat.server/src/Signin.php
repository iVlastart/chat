<?php
    class Signin
    {
        private PDO $conn;

        public function __construct(Db $db,
                                    private string $username,
                                    private string $password)
        {
            $this->conn = $db->connect();
        }

        public function signin():bool
        {
            if(!$this->checkUsername()) return false;
            if($this->username===''&&$this->password==='') return false;
            $sql = "INSERT INTO users (Username, Password) VALUES (:Username, :Password)";
            $stmt = $this->conn->prepare($sql);
            $stmt->bindValue(":Username", $this->username, PDO::PARAM_STR);
            $stmt->bindValue(":Password", password_hash($this->password, PASSWORD_DEFAULT), PDO::PARAM_STR);
            $stmt->execute();
            return true;
        }

        private function checkUsername():bool
        {
            $sql = "SELECT Username FROM users WHERE Username=:Username";
            $stmt = $this->conn->prepare($sql);
            $stmt->bindValue(":Username", $this->username, PDO::PARAM_STR);
            $stmt->execute();
            $result = $stmt->fetch(PDO::FETCH_ASSOC);
            return !$result;
        }
    }