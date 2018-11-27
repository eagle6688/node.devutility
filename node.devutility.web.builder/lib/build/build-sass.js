/**
 * Compile sass files and integrate them into one css file for each page.
 * 
 * @author: Aldwin Su
 * @Copyright: 2018. All rights reserved.
 */

const fs = require('fs');
const ioUtilities = require("utilities-io");
const styleUtilities = require("utilities-style");

function compile(configHelper, styleFile, pageName) {
    let style;
    let styleFileName = configHelper.getPageStyleName(pageName);
    let styleFilePath = configHelper.getPageStylePath(pageName);

    try {
        style = styleUtilities.compile(styleFile).css;
    }
    catch (err) {
        console.error("Compile file", styleFile, "failed!", "\n", err);
        return false;
    }

    fs.writeFile(styleFilePath, style, err => {
        if (err) {
            throw err;
        }
    });

    console.log(styleFileName, "was generated!");
    return true;
}

module.exports = function (configHelper) {
    let styleDirectory = configHelper.getStyleDeployDirectory();
    ioUtilities.createDirectory(styleDirectory);

    let config = configHelper.options;
    let pagePaths = configHelper.getPagesDirectories();

    for (let index in pagePaths) {
        let pagePath = pagePaths[index];
        let pageName = ioUtilities.getLastPath(pagePath);
        let styleFiles = ioUtilities.getAllFiles(pagePath, config.compile.pageStyleNameRegex);

        if (!styleFiles || styleFiles.length == 0) {
            continue;
        }

        compile(configHelper, styleFiles[0], pageName);
    }
};