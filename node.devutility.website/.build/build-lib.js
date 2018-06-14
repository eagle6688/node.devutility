/**
 * Compress all base javascript files into one javascript file.
 * Complie SASS and Typescript files.
 */

const fs = require('fs');
const path = require('path');

const config = require("../bin/config");
const jsUtilities = require("../bin/lib/jsUtilities");

let jsArray = [];
let jsLibPath = path.join(config.directory.deploy.scripts, config.compile.jsLibName);
let files = config.directory.resources.scripts;

for (let index in files) {
    let content = jsUtilities.compressJs(files[index]);
    jsArray.push(content);
}

fs.writeFileSync(jsLibPath, jsArray.join('\n'));