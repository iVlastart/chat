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

        public function login()
        {
            $sql = "SELECT Username, Password FROM users WHERE Username=:Username AND Password=:Password";
            $stmt = $this->conn->prepare($sql);
            
        }
    }