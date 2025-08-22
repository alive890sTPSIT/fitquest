<?php
require_once 'DataBase.php';
require_once __DIR__ . '/../validate.php';

class UtentiController
{
    public static function Read()
    {
        $stmt = DataBase::getConnection()->prepare('SELECT * FROM utenti');
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

        return [
            "success" => true,
            "data" => $result
        ];
    }

    public static function ReadUtente($id)
    {
        $stmt = DataBase::getConnection()->prepare('SELECT * FROM utenti WHERE id = :id');
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);
        $stmt->execute();
        $utente = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$utente) {
            http_response_code(404);
            return [
                "success" => false,
                "error" => "Utente non trovato"
            ];
        }

        return [
            "success" => true,
            "data" => $utente
        ];
    }

    public static function Create($Utente)
{
    // DEBUG: log the received data
    //error_log("DEBUG Create method received:");
    //error_log(print_r($Utente, true));
    $UtenteObject = json_decode(json_encode($Utente)); // array → object

    if (!ModelValidator::validate($UtenteObject, "../schemas/Utente.schema.json")) {
        http_response_code(400);
        return ["success" => false, "error" => "Utente non valido"];
    }

    $stmt = DataBase::getConnection()->prepare(
    'INSERT INTO utenti (nome, username, email, password_hash, data_iscrizione) 
     VALUES (:nome, :username, :email, :password_hash, :data_iscrizione)'
);

// pick only the keys that match the placeholders
$executeArray = [
    'nome' => $Utente['nome'],
    'username' => $Utente['username'],
    'email' => $Utente['email'],
    'password_hash' => $Utente['password_hash'],
    'data_iscrizione' => $Utente['data_iscrizione']
];

if ($stmt->execute($executeArray)) {
    http_response_code(201);
    return ["success" => true, "data" => ["id" => DataBase::getConnection()->lastInsertId()]];
} else {
    http_response_code(500);
    return ["success" => false, "error" => "Creazione utente fallita"];
}
}


}

