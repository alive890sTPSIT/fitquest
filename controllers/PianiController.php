<?php
require_once 'DataBase.php';
require_once __DIR__ . '/../validate.php';

class PianiController
{
    public static function Read()
    {
        $stmt = DataBase::getConnection()->prepare('SELECT * FROM piani');
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return [
            "success" => true,
            "data" => $result
        ];
    }

    public static function ReadPiano($utente_id)
    {
        $stmt = DataBase::getConnection()->prepare('SELECT * FROM piani WHERE utente_id = :utente_id');
        $stmt->bindParam(':utente_id', $utente_id, PDO::PARAM_INT);
        $stmt->execute();
        $piano = $stmt->fetch(PDO::FETCH_ASSOC);
        if (!$piano) {
            http_response_code(404);
            return [
                "success" => false,
                "error" => "Piano non trovato per questo utente"
            ];
        }
        return [
            "success" => true,
            "data" => $piano
        ];
    }

    public static function Create($piano)
    {
        $pianoObject = json_decode(json_encode($piano)); // array → object
        if (!ModelValidator::validate($pianoObject, "../schemas/Piano.schema.json")) {
            http_response_code(400);
            return ["success" => false, "error" => "Piano non valido"];
        }
        $stmt = DataBase::getConnection()->prepare(
            'INSERT INTO piani (utente_id, nome, descrizione)
             VALUES (:utente_id, :nome, :descrizione)'
        );
        $executeArray = [
            'utente_id' => $piano['utente_id'],
            'nome' => $piano['nome'],
            'descrizione' => $piano['descrizione']
        ];
        if ($stmt->execute($executeArray)) {
            http_response_code(201);
            return ["success" => true, "data" => ["id" => DataBase::getConnection()->lastInsertId()]];
        } else {
            http_response_code(500);
            return ["success" => false, "error" => "Creazione piano fallita"];
        }
    }

    public static function Update($piano)
    {
        $pianoObject = json_decode(json_encode($piano)); // array → object
        if (!ModelValidator::validate($pianoObject, "../schemas/Piano.schema.json")) {
            http_response_code(400);
            return ["success" => false, "error" => "Piano non valido"];
        }
        $stmt = DataBase::getConnection()->prepare(
            'UPDATE piani
             SET nome = :nome, descrizione = :descrizione
             WHERE id = :id'
        );
        $executeArray = [
            'id' => $piano['id'],
            'nome' => $piano['nome'],
            'descrizione' => $piano['descrizione']
        ];
        if ($stmt->execute($executeArray)) {
            http_response_code(200);
            return ["success" => true];
        } else {
            http_response_code(500);
            return ["success" => false, "error" => "Aggiornamento piano fallito"];
        }
    }

    public static function Delete($utente_id)
    {
        $stmt = DataBase::getConnection()->prepare('DELETE FROM piani WHERE utente_id = :utente_id');
        $stmt->bindParam(':utente_id', $utente_id, PDO::PARAM_INT);
        if ($stmt->execute()) {
            http_response_code(200);
            return ["success" => true];
        } else {
            http_response_code(500);
            return ["success" => false, "error" => "Cancellazione piano fallita"];
        }
    }
}
