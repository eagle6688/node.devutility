/**
 * Compile sass files and integrate into one css file for each page.
 */

const fs = require('fs');
const sysPath = require("path");

const config = require("../bin/config");
const ioUtilities = require("../bin/lib/ioUtilities");
const sassUtilities = require("../bin/lib/sassUtilities");

function saveStyle(sassFile, styleFilePath) {
    let sassFileName = ioUtilities.getLastPath(sassFile);
    let comment = sassUtilities.getComment(sassFileName);
    let result = sassUtilities.compile(sassFile);
    let cssContent = comment + result.css.toString();
    fs.writeFileSync(styleFilePath, cssContent);
}

function getStyle(sassFile) {
    let sassFileName = ioUtilities.getLastPath(sassFile);
    let comment = sassUtilities.getComment(sassFileName);
    let result = sassUtilities.compile(sassFile);
    return comment + result.css.toString();
}

function getPageStylePath(pagePath) {
    let pageName = ioUtilities.getLastPath(pagePath);
    let styleFileName = config.getPageStyleName(pageName);
    return sysPath.join(config.directory.deploy.styles, styleFileName);
}

let pagePaths = ioUtilities.getDirectories(config.directory.pages);

for (let index in pagePaths) {
    let pagePath = pagePaths[index];
    let styleFilePath = getPageStylePath(pagePath);
    let sassFiles = ioUtilities.getAllFiles(pagePath, /.+(index.scss|index.sass)/);

    if (!sassFiles || sassFiles.length == 0) {
        continue;
    }

    let cssArray = [];

    for (let sassFileIndex in sassFiles) {
        let cssContent = getStyle(sassFiles[sassFileIndex]);
        cssArray.push(cssContent);
    }

    fs.writeFileSync(styleFilePath, cssArray.join('\n'));
}