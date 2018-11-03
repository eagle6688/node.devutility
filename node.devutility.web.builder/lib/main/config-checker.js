/**
 * Configuration checker.
 * 
 * @author: Aldwin Su
 * @Copyright: 2018. All rights reserved.
 */

const checker = {
    deploy: {}
};

checker.deploy.version = function (options) {
    if (!options.versionedType) {
        return true;
    }

    if (options.deploy.versionedType != 'param' && options.deploy.versionedType != 'prefix') {
        throw new Error("Invalid parameter 'deploy.versionedType': " + options.deploy.versionedType);
    }
};

checker.check = function (options) {
    checker.deploy.version(options);
    return true;
};

module.exports = function (options) {
    return checker.check(options);
};