<?php
session_start();
// Get namespace (module) and action
$module = $_GET['module'] ?? null;
$action = $_GET['action'] ?? null;

$response = null;
if ($module === 'auth') {

    switch ($action) {
        case 'login':
            require 'controllers/AuthController.php';
            $response = AuthController::login(json_decode(file_get_contents('php://input'), true));
            break;

        case 'logout':
            require 'controllers/AuthController.php';
            $response = AuthController::logout();
            break;

        default:
            $response = ['success' => false, 'error' => 'Unknown auth action'];
    }
    echo json_encode($response);
    exit;
}
if ($module === "utente") {
    require_once './controllers/UtentiController.php';
    switch ($action) {
        case 'create':
            $response = UtentiController::Create(json_decode(file_get_contents('php://input'), true));
            break;
        default:
            $response = ['success' => false, 'error' => 'Unknown action for Utente module'];
    }
    echo json_encode($response);
    exit;
}
// All other modules require authentication
if (!isset($_SESSION['user_id'])) {
    echo json_encode(['success' => false, 'error' => 'Authentication required']);
    exit;
}

$response = null;
switch ($module) {
    case 'piano':
        require 'controllers/PianiController.php';
        switch ($action) {
            case 'read':
                $response = PianiController::Read();
                break;
            case 'readById':
                $id = $_GET['id'] ?? null;
                if ($id === null) {
                    http_response_code(400);
                    $response = [
                        "success" => false,
                        "error" => "Parametro 'id' mancante"
                    ];
                } else {
                    $response = PianiController::ReadPiano($_GET['id']);
                }
                break;
            case 'create':
                try {
                    $data = json_decode(file_get_contents('php://input'), true);
                    $response = PianiController::Create($data);
                } catch (\Throwable $th) {
                    $response = [
                        "success" => false,
                        "error" => "Creazione del Piano fallita: " . $th->getMessage()
                    ];
                }
                break;
            case 'update':
                try {
                    $data = json_decode(file_get_contents('php://input'), true);
                    $response = PianiController::Update($data);
                } catch (\Throwable $th) {
                    $response = [
                        "success" => false,
                        "error" => "Aggiornamento del Piano fallito: " . $th->getMessage()
                    ];
                }
                break;
            case 'delete':
                $response = PianiController::Delete($_GET['id']);
                break;
            default:
                $response = ['success' => false, 'error' => 'Unknown action for piano module'];
        }

        break;
    case 'progresso':
        require 'controllers/ProgressiController.php';
        switch ($action) {
            case 'read':
                $response = ProgressiController::Read();
                break;

            case 'readById':
                $id = $_GET['id'] ?? null;
                if ($id === null) {
                    http_response_code(400);
                    $response = [
                        "success" => false,
                        "error" => "Parametro 'id' mancante"
                    ];
                } else {
                    $response = ProgressiController::ReadProgresso($_GET['id']);
                }
                break;

            case 'create':
                try {
                    $data = json_decode(file_get_contents('php://input'), true);
                    $response = ProgressiController::Create($data);
                } catch (\Throwable $th) {
                    $response = [
                        "success" => false,
                        "error" => "Creazione del Progresso fallita: " . $th->getMessage()
                    ];
                }
                break;

            case 'update':
                try {
                    $data = json_decode(file_get_contents('php://input'), true);
                    $response = ProgressiController::Update($data);
                } catch (\Throwable $th) {
                    $response = [
                        "success" => false,
                        "error" => "Aggiornamento del Progresso fallito: " . $th->getMessage()
                    ];
                }
                break;

            case 'delete':
                $id = $_GET['id'] ?? null;
                if ($id === null) {
                    http_response_code(400);
                    $response = [
                        "success" => false,
                        "error" => "Parametro 'id' mancante"
                    ];
                } else {
                    $response = ProgressiController::Delete($id);
                }
                break;
            default:
                $response = ['success' => false, 'error' => 'Unknown action for progresso module'];
        }
        break;
    case 'allenamento':
        require_once './controllers/AllenamentiController.php';
        switch ($action) {
            case 'read':
                $response = AllenamentiController::Read();
                break;
            default:
                $response = ['success' => false, 'error' => 'Unknown action for allenamento module'];
        }

        break;


    default:
        $response = ['success' => false, 'error' => 'Unknown module'];
}

echo json_encode($response);
