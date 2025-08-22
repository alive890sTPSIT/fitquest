<?php
require 'vendor/autoload.php';

use JsonSchema\Validator;
use JsonSchema\Constraints\Constraint;

class ModelValidator{

    public static function validate(&$input, $schemaPath) {
        $validator = new Validator();
$schema = json_decode(file_get_contents(__DIR__ .$schemaPath ));
        $validator->validate($input, $schema, Constraint::CHECK_MODE_APPLY_DEFAULTS);
        if($validator->isValid())
            return true;
        else throw new Exception(json_encode($validator->getErrors()));
    }
}
