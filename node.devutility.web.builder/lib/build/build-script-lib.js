/**
 * Combine all of script files to one script file.
 */

const fs = require('fs');
const sysPath = require('path');
const ioUtilities = require("utilities-io");
const scriptUtilities = require("utilities-script");

function displayMessage(config, files) {
    console.log("Script files:");

    for (let index in files) {
        console.log(files[index], ",");
    }

    console.log("have been bundled into", config.compile.scriptLibName, "completely!");
}

module.exports = function (config) {
    if (!config.resources.scripts) {
        return;
    }

    let scriptFiles = config.resources.scripts;
    let projectDirectory = process.cwd();
    let scriptLibDir = sysPath.join(projectDirectory, config.deploy.scriptsDir);
    let scriptLibPath = sysPath.join(scriptLibDir, config.compile.scriptLibName);
    ioUtilities.createDirectory(scriptLibDir);

    let array = [];

    for (let index in scriptFiles) {
        let content = scriptUtilities.compressJs(scriptFiles[index]);
        array.push(content);
    }

    fs.writeFileSync(scriptLibPath, array.join('\n'));
    displayMessage(config, scriptFiles);
};