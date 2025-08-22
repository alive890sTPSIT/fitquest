<?php
require 'vendor/autoload.php';

use JsonSchema\Validator;
use JsonSchema\Constraints\Constraint;

header('Content-Type: application/json');

// Read JSON body from frontend
$input = json_decode(file_get_contents('php://input'));

// Load schema
$schema = json_decode(file_get_contents(__DIR__ . '/schemas/Utente.schema.json'));

// Validate
$validator = new Validator();
$validator->validate($input, $schema, Constraint::CHECK_MODE_APPLY_DEFAULTS);

if ($validator->isValid()) {
    echo json_encode(["status" => "success", "message" => "Valid data!"]);
} else {
    echo json_encode([
        "status" => "error",
        "errors" => $validator->getErrors()
    ]);
}
