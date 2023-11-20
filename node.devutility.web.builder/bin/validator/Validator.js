import BasisValidator from "./runtime/BasisValidator.js";
import HbsValidator from "./runtime/HbsValidator.js";
import WebpackValidator from "./runtime/WebpackValidator.js";
import ServerValidator from "./runtime/ServerValidator.js";

class Validator {
    static verify(handler) {
        new BasisValidator(handler).verify();
        new HbsValidator(handler).verify();
        new WebpackValidator(handler).verify();
        new ServerValidator(handler).verify();
    }
}

export default Validator;