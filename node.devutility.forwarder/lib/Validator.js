import { BaseValidator } from "utilities-common";

class Validator extends BaseValidator {
    static build() {
        return new Validator();
    }

    verify(options) {
        super.require(options, 'options', 'parameter');
        super.requireBoolean(options.debug, 'debug', 'configuration');
        super.requireObject(options.proxyOptions, 'proxyOptions', 'configuration');
    }
}

export default Validator;