import BaseValidator from "./BaseValidator.js";

class Validator extends BaseValidator {
    constructor(handler) {
        super(handler);
    }

    verify() {
        let options = super.getOptions();
        let webpack = options.webpack;
        super.requireObject(webpack, "webpack", "configuration");
    }
}

export default Validator;