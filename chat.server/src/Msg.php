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

        public function getMsgs():array
        {
            $sql = "SELECT UserID, Msg, Time FROM msg";
            $stmt = $this->conn->prepare($sql);
            $stmt->execute();
            $msgs = $stmt->fetchAll(PDO::FETCH_ASSOC);
            $data = [];
            foreach($msgs as $msg)
            {
                $sql = "SELECT Username FROM users WHERE ID=:ID";
                $stmt = $this->conn->prepare($sql);
                $stmt->bindValue(":ID", $msg["UserID"], PDO::PARAM_INT);
                $stmt->execute();
                $user = $stmt->fetch(PDO::FETCH_ASSOC);
                $data[] = [
                    'Username'=>$user['Username'],
                    'Msg'=>$msg['Msg'],
                    'Time'=>$msg['Time']
                ];
            }
            return $data;
        }
    }