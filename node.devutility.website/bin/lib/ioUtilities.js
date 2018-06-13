/**
 * IO operation utilities.
 * 
 * @author: Aldwin Su
 * @date: 2018-06-07 14:54:41
 * @Copyright: 2018. All rights reserved.
 */

const fs = require('fs');
const sysPath = require("path");
const uglifyJs = require("uglify-js");

let ioUtilities = {};
let projectDirectory = process.cwd();

ioUtilities.createDirectory = function (directory) {
    if (!directory) {
        throw new Error("Invalid directory parameter!");
    }

    if (directory.indexOf('/') == 0 || directory.indexOf('.') == 0) {
        throw new Error("Directory cannot start with . or /");
    }

    let array = directory.split('/');
    let dir = sysPath.join(projectDirectory);

    for (let i = 0; i < array.length; i++) {
        dir = sysPath.join(dir, array[i]);

        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }
    }
};

/**
 * Return all files absolute path located in directoty path, if path is a file return itself.
 * @param {*} path 
 */
ioUtilities.getAllFiles = function (path) {
    let files = [];
    path = sysPath.resolve(path);

    function _loadAllFiles(directory) {
        let array = fs.readdirSync(directory);

        for (let i = 0; i < array.length; i++) {
            let filePath = sysPath.join(directory, array[i]);
            let stat = fs.statSync(filePath);

            if (stat.isFile()) {
                files.push(filePath);
            }

            if (stat.isDirectory()) {
                _loadAllFiles(filePath);
            }
        }
    }

    _loadAllFiles(path);
    return files;
};

/**
 * Compress js file if its name without .min.js
 * @param {*} file 
 */
ioUtilities.compressJs = function (file) {
    let regex = /\.min.js$/;
    let content = fs.readFileSync(file).toString();

    if (regex.test(file)) {
        return content;
    }

    let result = uglifyJs.minify(content);
    return result.code;
};

module.exports = ioUtilities;