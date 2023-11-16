import BaseValidator from "./BaseValidator.js";

class Validator extends BaseValidator {
    constructor(handler) {
        super(handler);
    }

    verify() {
        let options = super.getOptions();
        let deploy = options.deploy;
        super.requireObject(deploy, "deploy", "configuration");
        this.#verify_versionedType(deploy.versionedType);
        super.optionalString(deploy.version, "deploy.version", "configuration");
        super.requireString(deploy.dir, "deploy.dir", "configuration");
        super.requireString(deploy.host, "deploy.host", "configuration");
        super.requireString(deploy.favicon, "deploy.favicon", "configuration");
        super.requireString(deploy.fontsDir, "deploy.fontsDir", "configuration");
        super.requireString(deploy.imagesDir, "deploy.imagesDir", "configuration");
        super.requireString(deploy.stylesDir, "deploy.stylesDir", "configuration");
        super.requireString(deploy.scriptsDir, "deploy.scriptsDir", "configuration");
    }

    #verify_versionedType(versionedType) {
        super.requireString(versionedType, "deploy.versionedType");

        if (versionedType != "param" && versionedType != "prefix") {
            throw new Error("Invalid parameter 'deploy.versionedType': " + versionedType + ", shoule be one of 'param' or 'prefix'.");
        }
    }
}

export default Validator;