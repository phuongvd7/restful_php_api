<?php 
//connect db by PDO
class db {
      private  $servername = "localhost";
      private  $username = "root";
      private  $password = "1234";
      private  $db = "restful_php_api";

    public function connect(){
       $this->conn = null; 
        try {
            $this->conn = new PDO("mysql:host=".$this->servername.";dbname=".$this->db."", $this->username, $this->password);
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
          //  echo "Connected successfully";
            }   catch(PDOException $e){
            echo "Connection failed: " . $e->getMessage();
            }
           return $this->conn;
        }      
}
?>