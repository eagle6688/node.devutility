/**
 * Combine all of script files to one script file.
 */

const fs = require('fs');
const sysPath = require('path');
const ioUtilities = require("utilities-io");
const scriptUtilities = require("utilities-script");

module.exports = function (config) {
    if (!config.resources.scripts) {
        return;
    }

    let projectDirectory = process.cwd();
    let scriptLibDir = sysPath.join(projectDirectory, config.deploy.scriptsDir);
    let scriptLibPath = sysPath.join(scriptLibDir, config.deploy.scriptsLibName);
    ioUtilities.createDirectory(scriptLibDir);

    let scripts = config.resources.scripts;
    let array = [];

    for (let index in scripts) {
        let content = scriptUtilities.compressJs(scripts[index]);
        array.push(content);
    }

    fs.writeFileSync(scriptLibPath, array.join('\n'));
};