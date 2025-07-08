<?php
    class Msg
    {
        private PDO $conn;
        public function __construct(Db $db)
        {
            $this->conn = $db->connect();
        }

        public function addMsg(int $id, string $msg):void
        {
            $sql = "INSERT INTO msg (UserID, Msg) VALUES (:UserID, :Msg)";
            $stmt = $this->conn->prepare($sql);
            $stmt->bindValue(":UserID", $id, PDO::PARAM_INT);
            $stmt->bindValue(":Msg", $msg, PDO::PARAM_STR);
            $stmt->execute();
        }

        public function getMsgs($id)
        {
            $sql = "SELECT UserID, Msg, Time FROM msg";
            $stmt = $this->conn->prepare($sql);
            $stmt->execute();
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        }
    }