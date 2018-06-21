/**
 * Compile sass files and integrate into one css file for each page.
 */

const fs = require('fs');
const ioUtilities = require("utilities-io");
const styleUtilities = require("utilities-style");

function getBaseStyles(styles) {
    let array = [];

    for (let index in styles) {
        let content = styleUtilities.compress(styles[index]);
        array.push(content);
    }

    return array.join('\n');
}

function compileSassFile(sassFile) {
    let sassFileName = ioUtilities.getLastPath(sassFile);
    let comment = styleUtilities.getComment(sassFileName);
    let result = styleUtilities.compile(sassFile);
    return comment + result.css.toString();
}

module.exports = function (configHelper) {
    let config = configHelper.options;
    let baseStylesContent = getBaseStyles(config.resources.styles);
    let pagePaths = ioUtilities.getDirectories(config.pages.dir);
    let styleDirectory = configHelper.getStyleDirectory();
    ioUtilities.createDirectory(styleDirectory);

    for (let index in pagePaths) {
        let pagePath = pagePaths[index];
        let pageName = ioUtilities.getLastPath(pagePath);
        let styleFilePath = configHelper.getPageStylePath(pageName);
        let styleFiles = ioUtilities.getAllFiles(pagePath, config.pages.styleNameRegex);

        if (!styleFiles || styleFiles.length == 0) {
            continue;
        }

        let array = [];
        array.push(baseStylesContent);

        styleFiles.forEach(styleFile => {
            array.push(compileSassFile(styleFile));
        });

        fs.writeFileSync(styleFilePath, array.join('\n'));
    }
};