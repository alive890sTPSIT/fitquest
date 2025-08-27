<?php
require_once 'DataBase.php';
require_once __DIR__ . '/../validate.php';

class AuthController{

    static public function login ($credentials){
        $emailusername=$credentials["emailusername"];
        $password=$credentials["password"];
        if (empty($emailusername) || empty($password)) {
            return ["success" => false, "error" => "Username e password sono obbligatori"];
        }
        $stmt = DataBase::getConnection()->prepare('SELECT * FROM utenti WHERE username = :username or email=:email');
        $stmt->bindParam(':username', $emailusername, PDO::PARAM_STR);
        $stmt->bindParam(':email', $emailusername, PDO::PARAM_STR);
        $stmt->execute();
        $utente = $stmt->fetch(PDO::FETCH_ASSOC);
        if (!$utente || $password!=$utente['password_hash']) {
            return ["success" => false, "error" => "Credenziali non valide"];
        }
        // Start session and store user ID
        $_SESSION['user_id'] = $utente['id'];
        return [
            "success" => true,
        ];
    }
    static public function logout(){
        session_start();
        session_unset();
        session_destroy();

        return [
            "success" => true,
        ];
    }}