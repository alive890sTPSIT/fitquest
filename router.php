<?php
require_once 'controllers/UtentiController.php';

header('Content-Type: application/json'); // ensure JSON response always

$action = $_GET['action'] ?? null;
$response = null;

switch ($action) {
    case 'ReadUtenti':
        $response = UtentiController::Read();
        break;

    case 'ReadUtente':
        $id = $_GET['id'] ?? null;
        if ($id === null) {
            http_response_code(400);
            $response = [
                "success" => false,
                "error" => "Parametro 'id' mancante"
            ];
        } else {
            $response = UtentiController::ReadUtente($id);
        }
        break;

    case 'CreateUtente':
        try {
            $data = json_decode(file_get_contents('php://input'), true);
            $response = UtentiController::Create($data);
        } catch (\Throwable $th) {
            $response = [
                "success" => false,
                "error" => "Creazione utente fallita: " . $th->getMessage()
            ];
        }
        break;

    default:
        http_response_code(400);
        $response = [
            "success" => false,
            "error" => "Invalid action"
        ];
        break;
}

// 🚀 Always output JSON from one place
echo json_encode($response);
