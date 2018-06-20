/**
 * Compile typescript files and integrate into one javascript file for each page.
 */

const fs = require('fs');
const sysPath = require("path");

const config = require("../bin/config");
const ioUtilities = require("utilities-io");
const scriptUtilities = require("utilities-script");

function getScript(tsFile) {
    let fileName = ioUtilities.getLastPath(tsFile);
    let comment = scriptUtilities.getComment(fileName);
    let script = scriptUtilities.compileTsFile(tsFile, config.tsConfig).outputText;
    return comment + script;
}

function getPageScriptPath(pagePath) {
    let pageName = ioUtilities.getLastPath(pagePath);
    let fileName = config.getPageScriptName(pageName);
    return sysPath.join(config.directory.deploy.scripts, fileName);
}

let pagePaths = ioUtilities.getDirectories(config.directory.pages);

for (let index in pagePaths) {
    let pagePath = pagePaths[index];
    let scriptFilePath = getPageScriptPath(pagePath);
    let tsFiles = ioUtilities.getAllFiles(pagePath, /.+index.ts$/);

    if (!tsFiles || tsFiles.length == 0) {
        continue;
    }

    let array = [];

    tsFiles.forEach(tsFile => {
        array.push(getScript(tsFile));
    });

    fs.writeFileSync(scriptFilePath, array.join('\n'));
}