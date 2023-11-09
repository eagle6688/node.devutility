import BaseValidator from "./BaseValidator.js";

class Validator extends BaseValidator {
    constructor(handler) {
        super(handler);
    }

    verify() {
        let options = super.getOptions();
        let compile = options.compile;
        super.requireObject(compile.pageStyleNameRegex, 'compile.pageStyleNameRegex');
        super.requireObject(compile.pageScriptNameRegex, 'compile.pageScriptNameRegex');
        super.requireString(compile.styleLibName, 'compile.styleLibName');
        super.requireString(compile.pageStyleNameFormat, 'compile.pageStyleNameFormat');
        super.requireString(compile.scriptLibName, 'compile.scriptLibName');
        super.requireString(compile.pageScriptNameFormat, 'compile.pageScriptNameFormat');
    }
}

export default Validator;