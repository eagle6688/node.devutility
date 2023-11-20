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
        this.#verify_deploy();
    }

    #verify_resource() {
        let options = super.getOptions();
        let resources = options.resources;
        super.requireString(resources.imagesDir, "resources.imagesDir", "configuration");
    }

    #verify_deploy() {
        new DeployValidator(this.handler).verify();

        let options = super.getOptions();
        let deploy = options.deploy;
        super.requireString(deploy.imagesDir, "deploy.imagesDir", "configuration");
    }
}

export default Validator;