/**
 * Open modules.
 */
const Builder = require("./lib/helper");

module.exports = function (options, router) {
    if (!options.server) {
        options.server = {};
    }

    if (router) {
        options.server.router = router;
    }

    return new Builder(options);
};