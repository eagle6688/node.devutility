import BasisValidator from "./BasisValidator.js";
import HbsValidator from "./HbsValidator.js";
import ResourceValidator from "./ResourceValidator.js";
import CompileValidator from "./CompileValidator.js";
import DeployValidator from "./DeployValidator.js";

class Validator {
    static verify(handler) {
        new BasisValidator(handler).verify();
        new HbsValidator(handler).verify();
        new ResourceValidator(handler).verify();
        new CompileValidator(handler).verify();
        new DeployValidator(handler).verify();
    }
}

export default Validator;