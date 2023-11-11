import BaseValidator from "./BaseValidator.js";

class Validator extends BaseValidator {
    constructor(handler) {
        super(handler);
    }

    verify() {
        let options = super.getOptions();
        let server = options.server;
        super.requireObject(server, 'server');

        let router = server.router;
        super.requireFunction(router, 'server.router');
    }
}

export default Validator;