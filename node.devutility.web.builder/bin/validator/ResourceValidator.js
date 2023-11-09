import BaseValidator from "./BaseValidator.js";

class Validator extends BaseValidator {
    constructor(handler) {
        super(handler);
    }

    verify() {
        let options = super.getOptions();
        let resources = options.resources;
        super.requireString(resources.fontsDir, "resources.fontsDir");
        super.requireString(resources.imagesDir, "resources.imagesDir");
        super.optionalObject(resources.styles, "resources.styles");
        super.optionalObject(resources.scripts, "resources.scripts");
    }
}

export default Validator;