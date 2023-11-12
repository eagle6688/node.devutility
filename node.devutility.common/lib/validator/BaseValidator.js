import fs from "fs";

class BaseValidator {
    #miss_message(prefix, name) {
        if (prefix) {
            return "Require " + prefix + " '" + name + "'!";
        }

        return "Require '" + name + "'!";
    }

    #invalid_type_message(prefix, name, type) {
        if (prefix) {
            return "Invalid " + prefix + " '" + name + "', should be " + type + "!";
        }

        return "Invalid '" + name + "', should be " + type + "!";
    }

    require(value, name, prefix) {
        if (!value) {
            throw new Error(this.#miss_message(prefix, name));
        }
    }

    requireType(value, type, name, prefix) {
        this.require(value, name, prefix);

        if (typeof value != type) {
            throw new Error(this.#invalid_type_message(prefix, name, type));
        }
    }

    requireBoolean(value, name, prefix) {
        this.requireType(value, 'boolean', name, prefix);
    }

    requireNumber(value, name, prefix) {
        this.requireType(value, 'number', name, prefix);
    }

    requireString(value, name, prefix) {
        this.requireType(value, 'string', name, prefix);
    }

    requireObject(value, name, prefix) {
        this.requireType(value, 'object', name, prefix);
    }

    requireSymbol(value, name, prefix) {
        this.requireType(value, 'symbol', name, prefix);
    }

    requireFunction(value, name, prefix) {
        this.requireType(value, 'function', name, prefix);
    }

    requirePath(path, name, prefix) {
        let message;

        if (prefix) {
            message = "Invalid " + prefix + " '" + name + "', path " + path + " not existed!";
        } else {
            message = "Invalid '" + name + "', path " + path + " not existed!";
        }

        if (!fs.existsSync(path)) {
            throw new Error(message);
        }
    }

    optionalType(value, type, name, prefix) {
        if (!value) {
            return;
        }

        if (typeof value != type) {
            throw new Error(this.#invalid_type_message(prefix, name, type));
        }
    }

    optionalBoolean(value, name, prefix) {
        this.optionalType(value, 'boolean', name, prefix);
    }

    optionalNumber(value, name, prefix) {
        this.optionalType(value, 'number', name, prefix);
    }

    optionalString(value, name, prefix) {
        this.optionalType(value, 'string', name, prefix);
    }

    optionalObject(value, name, prefix) {
        this.optionalType(value, 'object', name, prefix);
    }

    optionalSymbol(value, name, prefix) {
        this.optionalType(value, 'symbol', name, prefix);
    }

    optionalFunction(value, name, prefix) {
        this.optionalType(value, 'function', name, prefix);
    }
}

export default BaseValidator;