<?php
    class User
    {
        private PDO $conn;

        public function __construct(Db $db, 
                                    private string $username)
        {
            $this->conn = $db->connect();
        }

        public function getFriends()
        {
            $sql = "SELECT * FROM areFriends WHERE userID=:userID AND userID2=:userID2";
            
        }
        private function getUserID()
        {
            $sql = "SELECT ID FROM users WHERE Username=:Username";
            $stmt = $this->conn->prepare($sql);
            $stmt->bindValue(":Username", $this->username, PDO::PARAM_STR);
            $stmt->execute();

            $result = $stmt->fetch(PDO::FETCH_ASSOC);
            return $result['ID'];
        }
    }