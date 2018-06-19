/**
 * Compile sass files and integrate into one css file for each page.
 */

const fs = require('fs');
const sysPath = require("path");

const config = require("../bin/config");
const ioUtilities = require("utilities-io");
const styleUtilities = require("../../node.devutility.external/lib/styleUtilities");

function getStyle(sassFile) {
    let sassFileName = ioUtilities.getLastPath(sassFile);
    let comment = styleUtilities.getComment(sassFileName);
    let result = styleUtilities.compile(sassFile);
    return comment + result.css.toString();
}

function getPageStylePath(pagePath) {
    let pageName = ioUtilities.getLastPath(pagePath);
    let styleFileName = config.getPageStyleName(pageName);
    return sysPath.join(config.directory.deploy.styles, styleFileName);
}

function getBaseStyles() {
    let array = [];

    for (let index in config.directory.resources.styles) {
        let styleFile = config.directory.resources.styles[index];
        let content = styleUtilities.compress(styleFile);
        array.push(content);
    }

    return array.join('\n');
}

let baseStyles = getBaseStyles();
let pagePaths = ioUtilities.getDirectories(config.directory.pages);

for (let index in pagePaths) {
    let pagePath = pagePaths[index];
    let styleFilePath = getPageStylePath(pagePath);
    let sassFiles = ioUtilities.getAllFiles(pagePath, /.+(index.scss|index.sass)$/);

    if (!sassFiles || sassFiles.length == 0) {
        continue;
    }

    let array = [];
    array.push(baseStyles);

    sassFiles.forEach(sassFile => {
        array.push(getStyle(sassFile));
    });

    fs.writeFileSync(styleFilePath, array.join('\n'));
}