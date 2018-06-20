/**
 * Move font files to target directory.
 */

const sysPath = require("path");
const copyfiles = require('copyfiles');
const ioUtilities = require("utilities-io");

let projectDirectory = process.cwd();

module.exports = function (config) {
    let sourcePath = sysPath.join(projectDirectory, config.resources.fontsDir, "*");
    let targetPath = sysPath.join(projectDirectory, config.deploy.fontsDir);
    ioUtilities.createDirectory(targetPath);

    copyfiles([sourcePath, targetPath], true, function (error) {
        if (error) {
            console.log(error);
        }
    });
};