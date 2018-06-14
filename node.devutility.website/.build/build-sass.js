/**
 * Compile sass files and integrate into one css file for each page.
 */

const sysPath = require("path");

const config = require("../bin/config");
const ioUtilities = require("../bin/lib/ioUtilities");

let pagePaths = ioUtilities.getDirectories(config.directory.pages);

for (let index in pagePaths) {
    let pagePath = pagePaths[index];
    let array = pagePath.split(sysPath.sep);
    let pageName = array[array.length - 1];
    let sassFiles = ioUtilities.getAllFiles(pagePath, /.+(index.scss|index.sass)/);
}