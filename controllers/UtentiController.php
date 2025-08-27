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
    // Convert array → object for validation
    $UtenteObject = json_decode(json_encode($Utente));

    // Validate input against schema
    if (!ModelValidator::validate($UtenteObject, "../schemas/Utente.schema.json")) {
        http_response_code(400);
        return ["success" => false, "error" => "Utente non valido"];
    }

    // Hash the password
    if (!isset($Utente['password_hash']) || empty($Utente['password_hash'])) {
        http_response_code(400);
        return ["success" => false, "error" => "Password mancante"];
    }
    $passwordHash = password_hash($Utente['password_hash'], PASSWORD_DEFAULT);

    // Prepare SQL statement
    $stmt = DataBase::getConnection()->prepare(
        'INSERT INTO utenti (nome, username, email, password_hash, data_iscrizione) 
         VALUES (:nome, :username, :email, :password_hash, :data_iscrizione)'
    );

    // Build execute array with hashed password
    $executeArray = [
        'nome' => $Utente['nome'],
        'username' => $Utente['username'],
        'email' => $Utente['email'],
        'password_hash' => $passwordHash,
        'data_iscrizione' => $Utente['data_iscrizione']
    ];

    if ($stmt->execute($executeArray)) {
        return ["success" => true, "data" => ["id" => DataBase::getConnection()->lastInsertId()]];
    } else {
        return ["success" => false, "error" => "Creazione utente fallita"];
    }
}

    /**
     * data_iscrizione won't be updatable
     * @param mixed $Utente
     * @return array{error: string, success: bool|array{success: bool}}
     */
    public static function Update($Utente)
    {
        $UtenteObject = json_decode(json_encode($Utente)); // array → object

        if (!ModelValidator::validate($UtenteObject, "../schemas/Utente.schema.json")) {
            http_response_code(400);
            return ["success" => false, "error" => "Utente non valido"];
        }

        $stmt = DataBase::getConnection()->prepare(
            'UPDATE utenti SET nome = :nome, username = :username, email = :email, password_hash = :password_hash  
     WHERE id = :id'
        );

        // pick only the keys that match the placeholders
        $executeArray = [
            'id' => $Utente['id'],
            'nome' => $Utente['nome'],
            'username' => $Utente['username'],
            'email' => $Utente['email'],
            'password_hash' => $Utente['password_hash']
        ];

        if ($stmt->execute($executeArray)) {
            http_response_code(200);
            return ["success" => true];
        } else {
            http_response_code(500);
            return ["success" => false, "error" => "Aggiornamento utente fallito"];
        }
    }
    public static function Delete($id)
    {
        $stmt = DataBase::getConnection()->prepare('DELETE FROM utenti WHERE id = :id');
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);

        if ($stmt->execute()) {
            http_response_code(200);
            return ["success" => true];
        } else {
            http_response_code(500);
            return ["success" => false, "error" => "Cancellazione utente fallita"];
        }
    }
}

