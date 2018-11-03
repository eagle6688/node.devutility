/**
 * utilities-web-builder
 */

const fs = require("fs");
const path = require("path");
const Builder = require("./lib/builder");
const configFileName = "webbuilder.config.js";

module.exports = function (options, router) {
    if (!options) {
        let configFile = path.join(process.cwd(), configFileName);

        if (fs.existsSync(configFile)) {
            options = require(configFile);
        }
    }

    if (!options) {
        throw new Error("Need configuration!");
    }

    if (!options.server) {
        options.server = {};
    }

    if (router) {
        options.server.router = router;
    }

    return new Builder(options);
};