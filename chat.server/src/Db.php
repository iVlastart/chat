<?php
    class Db
    {
        public function __construct(private string $hostname,
                                    private string $name,
                                    private string $username,
                                    private string $password)
        {
            
        }

        public function connect()
        {
            $dsn = "mysql:host={$this->hostname};dbname={$this->name};charset=utf8";

            try
            {
                return new PDO($dsn, $this->username, $this->password);
            }
            catch(Exception $ex)
            {
                json_encode(["PDOconErr"=>$ex->getMessage()]);
            }
        }
    }