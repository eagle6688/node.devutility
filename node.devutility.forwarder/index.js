/**
 * Export modules.
 */

const Helper = require("./lib/helper");

module.exports = function (options) {
    return new Helper(options);
};