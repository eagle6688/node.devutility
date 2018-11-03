/**
 * Move images files to target directory.
 * 
 * @author: Aldwin Su
 * @Copyright: 2018. All rights reserved.
 */

const sysPath = require("path");
const ioUtilities = require("utilities-io");

module.exports = function (config) {
    let projectDirectory = process.cwd();
    let sourceDir = sysPath.join(projectDirectory, config.resources.imagesDir);
    let targetDir = sysPath.join(projectDirectory, config.deploy.dir, config.deploy.imagesDir);
    ioUtilities.copyFiles(sourceDir, targetDir);
};