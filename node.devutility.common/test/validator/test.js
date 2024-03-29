import Common from "../../index.js";

class Validator extends Common.BaseValidator {
    verify() {
        this.#verify_require();
        this.#verify_requireType();
        this.#verify_optionalType();
        this.#verify_boolean();
    }

    #verify_require() {
        super.require('123', 'asd');
        //super.require(null, 'asd');
        //super.require(null, 'asd', 'configuration');
    }

    #verify_requireType() {
        super.requireType('123', 'string', 'asd', 'configuration');
        //super.requireType('', 'string', 'asd', 'configuration');
        //super.requireType(123, 'string', 'asd', 'configuration');
        //super.requireType(123, 'string', 'asd');
    }

    #verify_optionalType() {
        super.optionalType(123, 'number', 'asd', 'configuration');
        super.optionalType(123, 'number', 'asd');
        super.optionalType(null, 'number', 'asd');
        super.optionalType(0, 'number', 'asd');
        //super.optionalType('123', 'number', 'asd', 'configuration');
        //super.optionalType('123', 'number', 'asd');
    }

    #verify_boolean() {
        super.requireBoolean(false, "bool", "configuration");
        //super.requireBoolean(1, "bool", "configuration");
        super.optionalBoolean(false, "bool", "configuration");
        //super.optionalBoolean(1, "bool", "configuration");
    }
}

new Validator().verify();