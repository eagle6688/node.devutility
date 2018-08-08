/**
 * Copy files or entire directory to target path.
 * If target path is a file, this module would overwrite it.
 * If target path is a directory, this module would copy "source" path into it.
 */

const fs = require('fs');
const sysPath = require("path");

function isFile(path) {
    let stat = fs.statSync(path);
    return stat.isFile();
}

function isDirectory(path) {
    let stat = fs.statSync(path);
    return stat.isDirectory();
}

function copyFile(source, target) {
    if (!isFile(source)) {
        throw new Error("Source path " + source + " is not a file, but target path " + target + " is.");
    }


}

module.exports = function (configHelper) {
    let config = configHelper.options;
    let copy = config.copy;

    for (let index in copy) {

    }


};