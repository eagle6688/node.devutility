import Common from "utilities-common";

class BaseValidator extends Common.BaseValidator {
    constructor(handler) {
        super();
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
}

export default BaseValidator;