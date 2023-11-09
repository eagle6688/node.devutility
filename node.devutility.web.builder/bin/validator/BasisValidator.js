import BaseValidator from "./BaseValidator.js";

class Validator extends BaseValidator {
    constructor(handler) {
        super(handler);
    }

    verify() {
        let options = super.getOptions();
        super.requireNumber(options.port, "port");
        this.#verify_views();
        super.optionalObject(options.staticPaths, "staticPaths");
    }

    #verify_views() {
        let options = super.getOptions();
        let handler = super.getHandler();
        super.require(options.views, "views");

        let viewDirectory = handler.getViewsDirectory();
        super.requirePath(viewDirectory, "views");
    }
}

export default Validator;