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
            $sql = "SELECT Username FROM users WHERE ID=:ID";
            $stmt = $this->conn->prepare($sql);
            $stmt->bindValue(":ID", $this->getFriendsID(), PDO::PARAM_INT);
            $stmt->execute();
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        }

        private function getFriendsID()
        {
            $sql = "SELECT friendID FROM areFriends WHERE userID=:userID";
            $stmt = $this->conn->prepare($sql);
            $stmt->bindValue(":userID", $this->getUserID(), PDO::PARAM_STR);
            $stmt->execute();
            return $stmt->fetch(PDO::FETCH_ASSOC);
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