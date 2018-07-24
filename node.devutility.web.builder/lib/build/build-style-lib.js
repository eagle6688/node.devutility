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

module.exports = function (configHelper) {
    let config = configHelper.options;
    let styleDirectory = configHelper.getStyleDirectory();
    let styleLibPath = sysPath.join(styleDirectory, config.deploy.stylesLibName);
    ioUtilities.createDirectory(styleDirectory);

    let styles = [];
    let styleFiles = config.resources.styles;

    try {
        styles = getStyles(styleFiles);
    }
    catch (err) {
        console.log('Bundle style files failed:', err);
        return;
    }

    let content = styles.join('\n');
    fs.writeFileSync(styleLibPath, content);

    let message = styleFiles.join(', ');
    console.log('Style files', message, 'have been bundled into', config.deploy.stylesLibName, 'completely!');
};