import BaseValidator from "../BaseValidator.js";
import DeployValidator from "./DeployValidator.js";

class Validator extends BaseValidator {
    constructor(handler) {
        super(handler);
    }

    static verify(handler) {
        new Validator(handler).#verify();
    }

    #verify() {
        this.#verify_compile();
        this.#verify_deploy();
    }

    #verify_compile() {
        let options = super.getOptions();
        let compile = options.compile;
        super.requireObject(compile.pageScriptNameRegex, "compile.pageScriptNameRegex", "configuration");
        super.requireString(compile.pageScriptNameFormat, "compile.pageScriptNameFormat", "configuration");
    }

    #verify_deploy() {
        new DeployValidator(this.handler).verify();

        let options = super.getOptions();
        let deploy = options.deploy;
        super.requireString(deploy.scriptsDir, "deploy.scriptsDir", "configuration");
    }
}

export default Validator;