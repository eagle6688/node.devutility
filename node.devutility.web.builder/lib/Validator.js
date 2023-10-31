/**
 * Configuration validator.
 * 
 * @author: Aldwin Su
 * @Copyright: 2023. All rights reserved.
 */

let validator = {
    deploy: {}
};

validator.deploy.version = function (options) {
    if (!options.versionedType) {
        return;
    }

    if (options.deploy.versionedType != 'param' && options.deploy.versionedType != 'prefix') {
        throw new Error("Invalid parameter 'deploy.versionedType': " + options.deploy.versionedType);
    }
};

validator.verify = function (options) {
    validator.deploy.version(options);
};

export default validator;