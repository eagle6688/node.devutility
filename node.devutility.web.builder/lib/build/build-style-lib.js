/**
 * Compress all base styles and integrate them into one css file.
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

function displayMessage(config, files) {
    console.log("Style files:");

    for (let index in files) {
        console.log(files[index], ",");
    }

    console.log("have been bundled into", config.compile.styleLibName, "completely!");
}

module.exports = function (configHelper) {
    let config = configHelper.options;
    let styleDirectory = configHelper.getStyleDirectory();
    let styleLibPath = sysPath.join(styleDirectory, config.compile.styleLibName);
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
    displayMessage(config, styleFiles);
};