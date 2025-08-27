<?php
require_once 'DataBase.php';
require_once __DIR__ . '/../validate.php';

class PianiController
{
    public static function Read()
    {
        $stmt = DataBase::getConnection()->prepare('SELECT * FROM piani where utente_id=:id');
        $stmt->bindParam(":id",$_SESSION['user_id'],PDO::PARAM_INT);
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return [
            "success" => true,
            "data" => $result
        ];
    }

    public static function ReadPiano($id)
    {
        $stmt = DataBase::getConnection()->prepare('SELECT * FROM piani WHERE utente_id = :utente_id and id=:id');
        $stmt->bindParam(':utente_id', $_SESSION['user_id'], PDO::PARAM_INT);
        $stmt->bindParam(":id",$id,PDO::PARAM_INT);

        $stmt->execute();
        $piano = $stmt->fetch(PDO::FETCH_ASSOC);
        if (!$piano) {
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
            return ["success" => false, "error" => "Piano non valido"];
        }
        $stmt = DataBase::getConnection()->prepare(
            'INSERT INTO piani (utente_id, nome, descrizione)
             VALUES (:utente_id, :nome, :descrizione)'
        );
        $executeArray = [
            'utente_id' => $_SESSION['user_id'],
            'nome' => $piano['nome'],
            'descrizione' => $piano['descrizione']
        ];
        if ($stmt->execute($executeArray)) {
            return ["success" => true, "data" => ["id" => DataBase::getConnection()->lastInsertId()]];
        } else {
            return ["success" => false, "error" => "Creazione piano fallita"];
        }
    }

   public static function Update($piano)
{

    $pianoObject = json_decode(json_encode($piano)); // array → object
    if (!ModelValidator::validate($pianoObject, "../schemas/Piano.schema.json")) {
        return ["success" => false, "error" => "Piano non valido"];
    }

    $stmt = DataBase::getConnection()->prepare(
        'UPDATE piani
         SET nome = :nome, descrizione = :descrizione
         WHERE id = :id AND utente_id = :id_utente'
    );

    $executeArray = [
        'id' => $piano['id'],
        'nome' => $piano['nome'],
        'descrizione' => $piano['descrizione'],
        'id_utente' => $_SESSION['user_id']
    ];

    if ($stmt->execute($executeArray)) {
        if ($stmt->rowCount() > 0) {
            return ["success" => true, "data" => "Updated successfully"];
        } else {
            return ["success" => false, "error" => "Not your plan"];
        }
    } else {
        return ["success" => false, "error" => "Aggiornamento piano fallito"];
    }
}


    public static function Delete($id)
    {
        $stmt = DataBase::getConnection()->prepare(
        'DELETE FROM piani WHERE utente_id = :utente_id AND id = :id'
    );
    $stmt->bindParam(':utente_id', $_SESSION['user_id'], PDO::PARAM_INT);
    $stmt->bindParam(':id', $id, PDO::PARAM_INT);

    if ($stmt->execute()) {
        if ($stmt->rowCount() > 0) {
            return [
                "success" => true,
                "data" => "Deleted successfully the plan"
            ];
        } else {
            return [
                "success" => false,
                "error" => "Not your plan"
            ];
        }
    } else {
        return [
            "success" => false,
            "error" => "Cancellazione piano fallita"
        ];
    }
    }
}
