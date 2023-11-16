import BaseValidator from "./BaseValidator.js";

class Validator extends BaseValidator {
    constructor(handler) {
        super(handler);
    }

    verify() {
        let options = super.getOptions();
        let hbs = options.hbs;
        super.optionalObject(hbs.pages, "hbs.pages", "configuration");
        super.optionalObject(hbs.partials, "hbs.partials", "configuration");
        super.requireString(hbs.defaultLayout, "hbs.defaultLayout", "configuration");
    }
}

export default Validator;