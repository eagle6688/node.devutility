/**
 * Move images files to target directory.
 */

const sysPath = require("path");
const copyfiles = require('copyfiles');
const ioUtilities = require("utilities-io");

module.exports = function (config) {
    let projectDirectory = process.cwd();
    let sourcePath = sysPath.join(projectDirectory, config.resources.imagesDir, "*");
    let targetPath = sysPath.join(projectDirectory, config.deploy.imagesDir);
    ioUtilities.createDirectory(targetPath);

    copyfiles([sourcePath, targetPath], true, function (error) {
        if (error) {
            console.log(error);
        }
    });
};