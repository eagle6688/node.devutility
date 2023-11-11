import BasisValidator from "./BasisValidator.js";
import HbsValidator from "./HbsValidator.js";
import ResourceValidator from "./ResourceValidator.js";
import CompileValidator from "./CompileValidator.js";
import DeployValidator from "./DeployValidator.js";
import CopyValidator from "./CopyValidator.js";
import WebpackValidator from "./WebpackValidator.js";
import ServerValidator from "./ServerValidator.js";

class Validator {
    static verify(handler) {
        new BasisValidator(handler).verify();
        new HbsValidator(handler).verify();
        new ResourceValidator(handler).verify();
        new CompileValidator(handler).verify();
        new DeployValidator(handler).verify();
        new CopyValidator(handler).verify();
        new WebpackValidator(handler).verify();
        new ServerValidator(handler).verify();
    }
}

export default Validator;