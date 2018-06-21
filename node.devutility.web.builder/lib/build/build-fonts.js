/**
 * Move font files to target directory.
 */

const sysPath = require("path");
const ioUtilities = require("utilities-io");

module.exports = function (config) {
    let projectDirectory = process.cwd();
    let sourceDir = sysPath.join(projectDirectory, config.resources.fontsDir);
    let targetDir = sysPath.join(projectDirectory, config.deploy.fontsDir);
    ioUtilities.copyFiles(sourceDir, targetDir);
};