/**
 * Move images files to target directory.
 */

const sysPath = require("path");
const ioUtilities = require("utilities-io");

module.exports = function (config) {
    let projectDirectory = process.cwd();
    let sourceDir = sysPath.join(projectDirectory, config.resources.imagesDir);
    let targetDir = sysPath.join(projectDirectory, config.deploy.imagesDir);
    ioUtilities.copyFiles(sourceDir, targetDir);
};