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

    }