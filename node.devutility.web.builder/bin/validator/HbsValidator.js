import BaseValidator from "./BaseValidator.js";

class Validator extends BaseValidator {
    constructor(handler) {
        super(handler);
    }

    verify() {
        let options = super.getOptions();
        let hbs = options.hbs;
        super.optionalObject(hbs.pages, 'hbs.pages');
        super.optionalObject(hbs.partials, 'hbs.partials');
        super.requireString(hbs.defaultLayout, 'hbs.defaultLayout');
    }
}

export default Validator;