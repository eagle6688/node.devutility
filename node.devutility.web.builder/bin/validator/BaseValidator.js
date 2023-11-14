import fs from "fs";

class BaseValidator {
    constructor(handler) {
        this.handler = handler;
    }

    getHandler() {
        return this.handler;
    }

    getOptions() {
        let handler = this.getHandler();

        if (handler) {
            return handler.getOptions();
        }

        return null;
    }

    require(value, name) {
        if (!value) {
            throw new Error("Require configuration '" + name + "'!");
        }
    }

    requireString(value, name) {
        this.require(value, name);

        if (typeof value != 'string') {
            throw new Error("Invalid configuration '" + name + "', should be string!");
        }
    }

    requirePath(path, name) {
        if (!fs.existsSync(path)) {
            throw new Error("Invalid configuration '" + name + "', path " + path + " not existed!");
        }
    }

    requireNumber(value, name) {
        this.require(value, name);

        if (typeof value != 'number') {
            throw new Error("Invalid configuration '" + name + "', should be number!");
        }
    }

    requireObject(value, name) {
        this.require(value, name);

        if (typeof value != 'object') {
            throw new Error("Invalid configuration '" + name + "', should be object!");
        }
    }

    requireFunction(value, name) {
        this.require(value, name);

        if (typeof value != "function") {
            throw new Error("Invalid configuration '" + name + "', should be function!");
        }
    }

    optionalString(value, name) {
        if (!value) {
            return;
        }

        if (typeof value != 'string') {
            throw new Error("Invalid configuration '" + name + "', should be string!");
        }
    }

    optionalObject(value, name) {
        if (!value) {
            return;
        }

        if (typeof value != 'object') {
            throw new Error("Invalid configuration '" + name + "', should be object!");
        }
    }
}

export default BaseValidator;