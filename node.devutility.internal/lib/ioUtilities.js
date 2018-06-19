/**
 * IO operation utilities.
 * 
 * @author: Aldwin Su
 * @date: 2018-06-07 14:54:41
 * @Copyright: 2018. All rights reserved.
 */

const fs = require('fs');
const sysPath = require("path");

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
 * @param {*} regex 
 */
ioUtilities.getAllFiles = function (path, regex) {
    let files = [];
    path = sysPath.resolve(path);

    function _loadAllFiles(directory) {
        let array = fs.readdirSync(directory);

        for (let i = 0; i < array.length; i++) {
            let filePath = sysPath.join(directory, array[i]);
            let stat = fs.statSync(filePath);

            if (stat.isFile()) {
                if (regex) {
                    if (regex.test(filePath)) {
                        files.push(filePath);
                    }

                    continue;
                }

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
 * Return all files under the specified path.
 * @param {*} path 
 * @param {*} regex 
 */
ioUtilities.getFiles = function (path, regex) {
    let files = [];
    path = sysPath.resolve(path);
    let array = fs.readdirSync(path);

    for (let index in array) {
        let filePath = sysPath.join(path, array[index]);
        let stat = fs.statSync(filePath);

        if (!stat.isFile()) {
            continue;
        }

        if (regex) {
            if (regex.test(filePath)) {
                files.push(filePath);
            }

            continue;
        }

        files.push(filePath);
    }

    return files;
};

/**
 * Return all directories under the specified path.
 * @param {*} path 
 */
ioUtilities.getDirectories = function (path) {
    let directories = [];
    path = sysPath.resolve(path);
    let array = fs.readdirSync(path);

    for (let i = 0; i < array.length; i++) {
        let filePath = sysPath.join(path, array[i]);
        let stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
            directories.push(filePath);
        }
    }

    return directories;
};

/**
 * Get the last path.
 * @param {*} path 
 */
ioUtilities.getLastPath = function (path) {
    let array = path.split(sysPath.sep);
    return array[array.length - 1];
};

module.exports = ioUtilities;