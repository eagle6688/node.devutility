/**
 * Compress all base styles and integrate them into one css file.
 * 
 * @author: Aldwin Su
 * @Copyright: 2018. All rights reserved.
 */

const fs = require('fs');
const sysPath = require('path');
const ioUtilities = require("utilities-io");
const styleUtilities = require("utilities-style");

function getStyles(files) {
    let array = [];

    for (let index in files) {
        let styleFile = files[index];
        let content = styleUtilities.compress(styleFile);
        array.push(content);
    }

    return array;
}

function displayMessage(files, target) {
    console.log("Style files:");

    for (let index in files) {
        console.log(files[index], ",");
    }

    console.log("have been bundled into", target, "completely!");
}

module.exports = function (configer) {
    let config = configer.options;
    let styleDirectory = configer.getStyleDeployDirectory();
    let styleLibName = configer.getStyleLibName();
    let styleLibPath = sysPath.join(styleDirectory, styleLibName);
    ioUtilities.createDirectory(styleDirectory);

    let styles = [];
    let styleFiles = config.resources.styles;

    try {
        styles = getStyles(styleFiles);
    }
    catch (err) {
        console.log("Bundle style files failed:", err);
        return;
    }

    let content = styles.join('\n');
    fs.writeFileSync(styleLibPath, content);
    displayMessage(styleFiles, styleLibPath);
};