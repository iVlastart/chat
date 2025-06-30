<?php
    class User
    {
        private PDO $conn;

        public function __construct(Db $db, 
                                    private string $username)
        {
            $this->conn = $db->connect();
        }

        
    }