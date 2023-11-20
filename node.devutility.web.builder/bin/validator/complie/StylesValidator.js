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
        super.optionalObject(resources.styles, "resources.styles", "configuration");
    }

    #verify_compile() {
        let options = super.getOptions();
        let compile = options.compile;
        super.requireString(compile.styleLibName, "compile.styleLibName", "configuration");
    }

    #verify_deploy() {
        new DeployValidator(this.handler).verify();

        let options = super.getOptions();
        let deploy = options.deploy;
        super.requireString(deploy.stylesDir, "deploy.stylesDir", "configuration");
    }
}

export default Validator;