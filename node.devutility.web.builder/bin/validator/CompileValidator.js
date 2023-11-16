import BaseValidator from "./BaseValidator.js";

class Validator extends BaseValidator {
    constructor(handler) {
        super(handler);
    }

    verify() {
        let options = super.getOptions();
        let compile = options.compile;
        super.requireObject(compile.pageStyleNameRegex, "compile.pageStyleNameRegex", "configuration");
        super.requireObject(compile.pageScriptNameRegex, "compile.pageScriptNameRegex", "configuration");
        super.requireString(compile.styleLibName, "compile.styleLibName", "configuration");
        super.requireString(compile.pageStyleNameFormat, "compile.pageStyleNameFormat", "configuration");
        super.requireString(compile.scriptLibName, "compile.scriptLibName", "configuration");
        super.requireString(compile.pageScriptNameFormat, "compile.pageScriptNameFormat", "configuration");
    }
}

export default Validator;