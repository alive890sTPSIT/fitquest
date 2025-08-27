<?php
require_once 'DataBase.php';
require_once __DIR__ . '/../validate.php';

class ProgressiController
{
    public static function Read()
    {
        $stmt = DataBase::getConnection()->prepare(
            'SELECT * FROM progressi WHERE utente_id = :id'
        );
        $stmt->bindParam(":id", $_SESSION['user_id'], PDO::PARAM_INT);
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

        return [
            "success" => true,
            "data" => $result
        ];
    }

    public static function ReadProgresso($id)
    {
        $stmt = DataBase::getConnection()->prepare(
            'SELECT * FROM progressi WHERE utente_id = :utente_id AND id = :id'
        );
        $stmt->bindParam(':utente_id', $_SESSION['user_id'], PDO::PARAM_INT);
        $stmt->bindParam(":id", $id, PDO::PARAM_INT);

        $stmt->execute();
        $progresso = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$progresso) {
            return [
                "success" => false,
                "error" => "Progresso non trovato per questo utente"
            ];
        }

        return [
            "success" => true,
            "data" => $progresso
        ];
    }

    public static function Create($progresso)
    {
        $progressoObject = json_decode(json_encode($progresso)); // array → object
        if (!ModelValidator::validate($progressoObject, "../schemas/Progresso.schema.json")) {
            return ["success" => false, "error" => "Progresso non valido"];
        }

        $stmt = DataBase::getConnection()->prepare(
            'INSERT INTO progressi (utente_id, allenamento_id, data, commenti)
             VALUES (:utente_id, :allenamento_id, :data, :commenti)'
        );

        $executeArray = [
            'utente_id' => $_SESSION['user_id'],
            'allenamento_id' => $progresso['allenamento_id'],
            'data' => $progresso['data'],
            'commenti' => $progresso['commenti']
        ];

        if ($stmt->execute($executeArray)) {
            return [
                "success" => true,
                "data" => ["id" => DataBase::getConnection()->lastInsertId()]
            ];
        } else {
            return ["success" => false, "error" => "Creazione progresso fallita"];
        }
    }

    public static function Update($progresso)
    {

        $progressoObject = json_decode(json_encode($progresso));
        if (!ModelValidator::validate($progressoObject, "../schemas/Progresso.schema.json")) {
            return ["success" => false, "error" => "Progresso non valido"];
        }

        $stmt = DataBase::getConnection()->prepare(
            'UPDATE progressi
             SET allenamento_id = :allenamento_id, data = :data, commenti = :commenti
             WHERE id = :id AND utente_id = :id_utente'
        );

        $executeArray = [
            'id' => $progresso['id'],
            'allenamento_id' => $progresso['allenamento_id'],
            'data' => $progresso['data'],
            'commenti' => $progresso['commenti'],
            'id_utente' => $_SESSION['user_id']
        ];

        if ($stmt->execute($executeArray)) {
            if ($stmt->rowCount() > 0) {
                return ["success" => true, "data" => "Updated successfully"];
            } else {
                return ["success" => false, "error" => "Not your record"];
            }
        } else {
            return ["success" => false, "error" => "Aggiornamento progresso fallito"];
        }
    }

    public static function Delete($id)
    {
        $stmt = DataBase::getConnection()->prepare(
            'DELETE FROM progressi WHERE utente_id = :utente_id AND id = :id'
        );
        $stmt->bindParam(':utente_id', $_SESSION['user_id'], PDO::PARAM_INT);
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);

        if ($stmt->execute()) {
            if ($stmt->rowCount() > 0) {
                return [
                    "success" => true,
                    "data" => "Deleted successfully the progresso"
                ];
            } else {
                return [
                    "success" => false,
                    "error" => "Not your record"
                ];
            }
        } else {
            return [
                "success" => false,
                "error" => "Cancellazione progresso fallita"
            ];
        }
    }
}
