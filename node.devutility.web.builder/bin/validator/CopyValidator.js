import BaseValidator from "./BaseValidator.js";

class Validator extends BaseValidator {
    constructor(handler) {
        super(handler);
    }

    verify() {
        let options = super.getOptions();
        let copy = options.copy;
        super.optionalObject(copy, "copy", "configuration");
        this.#verify_array(copy);
    }

    #verify_array(copy) {
        if (!copy || copy.length == 0) {
            return;
        }

        let handler = super.getHandler();

        for (let index in copy) {
            let item = copy[index];

            if (!item) {
                continue;
            }

            if (!item.source && !item.target) {
                continue;
            }

            let source = item.source;
            super.requireString(source, "copy[" + index + "].source", "configuration");

            let target = item.target;
            super.requireString(target, "copy[" + index + "].target", "configuration");

            let sourcePath = handler.getPath(source);
            super.requirePath(sourcePath, "copy[" + index + "].source", "configuration");
        }
    }
}

export default Validator;