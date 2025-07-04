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
            $result = [];
            foreach($this->getUsersID("friendID", "userID", "areFriends") as $id)
            {
                $sql = "SELECT users.Username FROM users WHERE ID=:ID";
                $stmt = $this->conn->prepare($sql);
                $stmt->bindValue(":ID", $id['friendID'], PDO::PARAM_INT);
                $stmt->execute();
                $result[]=$stmt->fetch(PDO::FETCH_ASSOC);
            }
            return $result;
        }
        private function getUserID()
        {
            $sql = "SELECT ID FROM users WHERE Username=:Username";
            $stmt = $this->conn->prepare($sql);
            $stmt->bindValue(":Username", $this->username, PDO::PARAM_STR);
            $stmt->execute();
            return $stmt->fetch(PDO::FETCH_ASSOC);
        }

        private function getUsersID(string $getID, string $stmtID, string $table)
        {
            $userID = $this->getUserID();
            $sql = "SELECT $getID FROM $table WHERE $stmtID=:ID";
            $stmt = $this->conn->prepare($sql);
            $stmt->bindValue(":ID", $userID['ID'], PDO::PARAM_INT); // Extract the actual ID
            $stmt->execute();
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        }
    }