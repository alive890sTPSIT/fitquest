<?php
session_start();
// Get namespace (module) and action
$module = $_GET['module'] ?? null;
$action = $_GET['action'] ?? null;

$response = null;
error_log("this is your module ".$_GET['module']);

if ($module === 'auth') {

    switch ($action) {
        case 'login':
            require 'controllers/AuthController.php';
            $response =  AuthController::login(json_decode(file_get_contents('php://input'),true));
            break;

        case 'logout':
            require 'controllers/AuthController.php';
            $response =AuthController::logout();
            break;

        default:
            $response =['success' => false, 'error' => 'Unknown auth action'];
    }
    echo json_encode($response);
    exit;
}

// All other modules require authentication
if (!isset($_SESSION['user_id'])) {
    echo json_encode(['success' => false, 'error' => 'Authentication required']);
    exit;
}

$response=null;
switch ($module) {
    case 'piano':
        require 'controllers/PianiController.php';
        switch ($action) {
            case 'read':
                $response = PianiController::Read();
                break;
            case 'readById':
                    $response = PianiController::ReadPiano($_SESSION['user_id']);
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
                    $response = PianiController::Delete($_SESSION['user_id']);
                break;
        }

        break;
    case 'progressi':

        break;
    default:
        $response = ['success' => false, 'error' => 'Unknown module'];
}

echo json_encode($response);
