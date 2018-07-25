/**
 * Compile sass files and integrate them into one css file for each page.
 */

const fs = require('fs');
const ioUtilities = require("utilities-io");
const styleUtilities = require("utilities-style");

function compile(configHelper, styleFiles, pageName) {
    let styleFileName = configHelper.getPageStyleName(pageName);
    let styleFilePath = configHelper.getPageStylePath(pageName);

    styleFiles.forEach(styleFile => {
        let style = '';

        try {
            style = styleUtilities.compile(styleFile).css;
        }
        catch (err) {
            console.log('Compile file', styleFile, 'failed!');
            return false;
        }

        fs.writeFileSync(styleFilePath, style);
    });

    console.log(styleFileName, 'was generated!');
    return true;
}

module.exports = function (configHelper) {
    let styleDirectory = configHelper.getStyleDirectory();
    ioUtilities.createDirectory(styleDirectory);

    let config = configHelper.options;
    let pagePaths = ioUtilities.getDirectories(config.app.pages);

    for (let index in pagePaths) {
        let pagePath = pagePaths[index];
        let pageName = ioUtilities.getLastPath(pagePath);
        let styleFiles = ioUtilities.getAllFiles(pagePath, config.app.styleNameRegex);

        if (!styleFiles || styleFiles.length == 0) {
            continue;
        }

        if (compile(configHelper, styleFiles, pageName)) {
            configHelper.saveResource_pageStyle(pageName);
        }
    }
};