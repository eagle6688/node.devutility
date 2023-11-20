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
        this.#verify_resource();
        this.#verify_compile();
        this.#verify_deploy();
    }

    #verify_resource() {
        let options = super.getOptions();
        let resources = options.resources;
        super.optionalObject(resources.scripts, "resources.scripts", "configuration");
    }

    #verify_compile() {
        let options = super.getOptions();
        let compile = options.compile;
        super.requireString(compile.scriptLibName, "compile.scriptLibName", "configuration");
    }

    #verify_deploy() {
        new DeployValidator(this.handler).verify();

        let options = super.getOptions();
        let deploy = options.deploy;
        super.requireString(deploy.scriptsDir, "deploy.scriptsDir", "configuration");
    }
}

export default Validator;