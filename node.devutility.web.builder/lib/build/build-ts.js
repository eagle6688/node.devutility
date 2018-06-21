/**
 * Compile typescript files and integrate into one javascript file for each page.
 */

const fs = require('fs');
const ioUtilities = require("utilities-io");
const scriptUtilities = require("utilities-script");

function compileTsFile(tsConfig, tsFile) {
    let fileName = ioUtilities.getLastPath(tsFile);
    let comment = scriptUtilities.getComment(fileName);
    let script = scriptUtilities.compileTsFile(tsFile, tsConfig).outputText;
    return comment + script;
}

module.exports = function (configHelper) {
    let config = configHelper.options;
    let pagePaths = ioUtilities.getDirectories(config.pages.dir);
    let scriptDirectory = configHelper.getScriptDirectory();
    ioUtilities.createDirectory(scriptDirectory);

    for (let index in pagePaths) {
        let pagePath = pagePaths[index];
        let pageName = ioUtilities.getLastPath(pagePath);
        let scriptFilePath = configHelper.getPageScriptPath(pageName);
        let scriptFiles = ioUtilities.getAllFiles(pagePath, config.pages.scriptNameRegex);

        if (!scriptFiles || scriptFiles.length == 0) {
            continue;
        }

        let array = [];

        scriptFiles.forEach(scriptFile => {
            array.push(compileTsFile(config.tsConfig, scriptFile));
        });

        fs.writeFileSync(scriptFilePath, array.join('\n'));
    }
};