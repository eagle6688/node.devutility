/**
 * Combine all of script files to one script file.
 * 
 * @author: Aldwin Su
 * @Copyright: 2018. All rights reserved.
 */

const fs = require('fs');
const sysPath = require('path');
const ioUtilities = require("utilities-io");
const scriptUtilities = require("utilities-script");

function displayMessage(files, target) {
    console.log("Script files:");

    for (let index in files) {
        console.log(files[index], ",");
    }

    console.log("have been bundled into", target, "completely!");
}

module.exports = function (configer) {
    let options = configer.options;

    if (!options.resources.scripts) {
        return;
    }

    let array = [];
    let scriptFiles = options.resources.scripts;
    let projectDirectory = process.cwd();
    let scriptLibDir = sysPath.join(projectDirectory, options.deploy.dir, options.deploy.scriptsDir);
    let scriptLibName = configer.getScriptLibName();
    let scriptLibPath = sysPath.join(scriptLibDir, scriptLibName);
    ioUtilities.createDirectory(scriptLibDir);

    for (let index in scriptFiles) {
        let content = scriptUtilities.compressJs(scriptFiles[index]);
        array.push(content);
    }

    fs.writeFile(scriptLibPath, array.join('\n'), err => { });
    displayMessage(scriptFiles, scriptLibPath);
};