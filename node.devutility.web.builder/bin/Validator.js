/**
 * Configuration validator.
 * 
 * @author: Aldwin Su
 * @Copyright: 2023. All rights reserved.
 */

let validator = {
    deploy: {},
    server: {}
};

validator.server.verify = function (options) {
    if (!options.server) {
        throw new Error("Require configuration 'server'!");
    }

    validator.server.router(options);
};

validator.server.router = function (options) {
    if (typeof options.server.router != "function") {
        throw new Error("Invalid configuration 'server.router', should be function type!");
    }
};

validator.deploy.verify = function (options) {
    if (!options.deploy) {
        throw new Error("Require configuration 'deploy'!");
    }

    validator.deploy.version(options);
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
    validator.server.verify(options);
    validator.deploy.version(options);
};

export default validator;