/**
 * Compress all base javascript files into one javascript file.
 * Complie SASS and Typescript files.
 */

const fs = require('fs');
const path = require('path');

const config = require("../bin/config");
const ioUtilities = require("../bin/lib/ioUtilities");

let jsLibPath = path.join(config.deploy.directory.scripts, config.compile.jsLibName);
let files = ioUtilities.getAllFiles("./resources/scripts");

fs.writeFileSync(jsLibPath, '');

for (let i = 0; i < files.length; i++) {
    let content = ioUtilities.compressJs(files[i]);

    if (content && i > 0) {
        content = '\n' + content;
    }

    fs.appendFileSync(jsLibPath, content);
}