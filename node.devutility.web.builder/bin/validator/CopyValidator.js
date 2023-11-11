import BaseValidator from "./BaseValidator.js";

class Validator extends BaseValidator {
    constructor(handler) {
        super(handler);
    }

    verify() {
        let options = super.getOptions();
        let copy = options.copy;
        super.optionalObject(copy, 'copy');
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
                throw new Error("Invalid configuration 'copy." + index + "', should be removed or no-null object!");
            }

            let source = item.source;
            super.requireString(source, 'copy[' + index + '].source');

            let target = item.target;
            super.requireString(target, 'copy[' + index + '].target');

            let sourcePath = handler.getPath(source);
            super.requirePath(sourcePath, 'copy[' + index + '].source');
        }
    }
}

export default Validator;