import BaseValidator from "./BaseValidator.js";

class Validator extends BaseValidator {
    constructor(handler) {
        super(handler);
    }

    verify() {
        let options = super.getOptions();
        let deploy = options.deploy;
        super.requireObject(deploy, 'deploy');
        this.#verify_versionedType(deploy.versionedType);
        super.optionalString(deploy.version, 'deploy.version');
        super.requireString(deploy.dir, 'deploy.dir');
        super.requireString(deploy.host, 'deploy.host');
        super.requireString(deploy.favicon, 'deploy.favicon');
        super.requireString(deploy.fontsDir, 'deploy.fontsDir');
        super.requireString(deploy.imagesDir, 'deploy.imagesDir');
        super.requireString(deploy.stylesDir, 'deploy.stylesDir');
        super.requireString(deploy.scriptsDir, 'deploy.scriptsDir');
    }

    #verify_versionedType(versionedType) {
        super.requireString(versionedType, 'deploy.versionedType');

        if (versionedType != 'param' && versionedType != 'prefix') {
            throw new Error("Invalid parameter 'deploy.versionedType': " + versionedType + ", shoule be one of 'param' or 'prefix'.");
        }
    }
}

export default Validator;