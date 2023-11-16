import BaseValidator from "./BaseValidator.js";

class Validator extends BaseValidator {
    constructor(handler) {
        super(handler);
    }

    verify() {
        let options = super.getOptions();
        let resources = options.resources;
        super.requireString(resources.fontsDir, "resources.fontsDir", "configuration");
        super.requireString(resources.imagesDir, "resources.imagesDir", "configuration");
        super.optionalObject(resources.styles, "resources.styles", "configuration");
        super.optionalObject(resources.scripts, "resources.scripts", "configuration");
    }
}

export default Validator;