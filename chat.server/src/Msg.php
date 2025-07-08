<?php
    class Msg
    {
        private PDO $conn;
        public function __construct(Db $db, 
                                    private string $id,
                                    private string $msg)
        {
            $this->conn = $db->connect();
        }

        public function addMsg(int $id, string $msg)
        {
            $sql = "INSERT INTO msg (UserID, Msg) VALUES (:UserID, :Msg)";
            $stmt = $this->conn->prepare($sql);
            $stmt->bindValue(":UserID", $id, PDO::PARAM_INT);
            $stmt->bindValue(":Msg", $msg, PDO::PARAM_STR);
            $stmt->execute();
        }
    }