<?php
require_once 'DataBase.php';
require_once __DIR__ . '/../validate.php';

class AllenamentiController
{
    public static function Read()
    {
        $stmt = DataBase::getConnection()->prepare('SELECT * FROM allenamenti');
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return [
            "success" => true,
            "data" => $result
        ];
    }

    public static function ReadAllenamento($id)
    {
        $stmt = DataBase::getConnection()->prepare('SELECT * FROM allenamenti WHERE id = :id');
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);
        $stmt->execute();
        $allenamento = $stmt->fetch(PDO::FETCH_ASSOC);
        if (!$allenamento) {
            http_response_code(404);
            return [
                "success" => false,
                "error" => "Allenamento non trovato"
            ];
        }
        return [
            "success" => true,
            "data" => $allenamento
        ];
    }

    public static function Create($allenamento)
    {
        $allenamentoObject = json_decode(json_encode($allenamento)); // array → object
        if (!ModelValidator::validate($allenamentoObject, "../schemas/Allenamento.schema.json")) {
            http_response_code(400);
            return ["success" => false, "error" => "Allenamento non valido"];
        }
        $stmt = DataBase::getConnection()->prepare(
            'INSERT INTO allenamenti (titolo, descrizione, durata, intensita)
             VALUES (:titolo, :descrizione, :durata, :intensita)'
        );
        $executeArray = [
            'titolo' => $allenamento['titolo'],
            'descrizione' => $allenamento['descrizione'],
            'durata' => $allenamento['durata'],
            'intensita' => $allenamento['intensita']
        ];
        if ($stmt->execute($executeArray)) {
            http_response_code(201);
            return ["success" => true, "data" => ["id" => DataBase::getConnection()->lastInsertId()]];
        } else {
            http_response_code(500);
            return ["success" => false, "error" => "Creazione allenamento fallita"];
        }
    }

    public static function Update($allenamento)
    {
        $allenamentoObject = json_decode(json_encode($allenamento)); // array → object
        if (!ModelValidator::validate($allenamentoObject, "../schemas/Allenamento.schema.json")) {
            http_response_code(400);
            return ["success" => false, "error" => "Allenamento non valido"];
        }
        $stmt = DataBase::getConnection()->prepare(
            'UPDATE allenamenti
             SET titolo = :titolo, descrizione = :descrizione, durata = :durata, intensita = :intensita
             WHERE id = :id'
        );
        $executeArray = [
            'id' => $allenamento['id'],
            'titolo' => $allenamento['titolo'],
            'descrizione' => $allenamento['descrizione'],
            'durata' => $allenamento['durata'],
            'intensita' => $allenamento['intensita']
        ];
        if ($stmt->execute($executeArray)) {
            http_response_code(200);
            return ["success" => true];
        } else {
            http_response_code(500);
            return ["success" => false, "error" => "Aggiornamento allenamento fallito"];
        }
    }

    public static function Delete($id)
    {
        $stmt = DataBase::getConnection()->prepare('DELETE FROM allenamenti WHERE id = :id');
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);
        if ($stmt->execute()) {
            http_response_code(200);
            return ["success" => true];
        } else {
            http_response_code(500);
            return ["success" => false, "error" => "Cancellazione allenamento fallita"];
        }
    }
}
