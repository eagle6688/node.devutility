import BaseValidator from "./BaseValidator.js";

class Validator extends BaseValidator {
    constructor(handler) {
        super(handler);
    }

    verify() {
        let options = super.getOptions();
        super.requireNumber(options.port, "port", "configuration");
        this.#verify_views();
        super.optionalObject(options.staticPaths, "staticPaths", "configuration");
    }

    #verify_views() {
        let options = super.getOptions();
        let handler = super.getHandler();
        super.require(options.views, "views", "configuration");

        let viewDirectory = handler.getViewsDirectory();
        super.requirePath(viewDirectory, "views", "configuration");
    }
}

export default Validator;