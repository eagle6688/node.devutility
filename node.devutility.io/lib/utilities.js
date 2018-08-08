/**
 * IO operation utilities.
 * 
 * @author: Aldwin Su
 * @date: 2018-06-07 14:54:41
 * @Copyright: 2018. All rights reserved.
 */

const fs = require('fs');
const sysPath = require("path");

let utilities = {};

/**
 * Create a directory recursively.
 * @param {*} directory 
 */
utilities.createDirectory = function (directory) {
    if (!directory) {
        throw new Error("Invalid directory parameter!");
    }

    if (!sysPath.isAbsolute(directory)) {
        directory = sysPath.resolve(directory);
    }

    let array = directory.split(sysPath.sep);
    let dir = array[0];

    for (let i = 0; i < array.length; i++) {
        if (i > 0) {
            dir = sysPath.join(dir, array[i]);
        }

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
utilities.getAllFiles = function (path, regex) {
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
utilities.getFiles = function (path, regex) {
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
utilities.getDirectories = function (path) {
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
utilities.getLastPath = function (path) {
    let array = path.split(sysPath.sep);
    return array[array.length - 1];
};

/**
 * Get directory.
 * @param {*} path 
 */
utilities.getDirectory = function (path) {
    let pathInfo = sysPath.parse(path);

    if (!pathInfo.ext) {
        return sysPath.join(pathInfo.dir, pathInfo.base);
    }

    return pathInfo.dir;
};

/**
 * Synchronously copy files from source to dest.
 * @param {*} source 
 * @param {*} dest 
 */
utilities.copyFiles = function (source, dest) {
    let sourceDir = sysPath.resolve(source);
    let destDir = sysPath.resolve(dest);
    let files = utilities.getAllFiles(sourceDir);

    for (let index in files) {
        let file = files[index];
        let tailPath = file.substr(sourceDir.length);
        let destPath = sysPath.join(destDir, tailPath);

        let fileInfo = sysPath.parse(destPath);
        utilities.createDirectory(fileInfo.dir);
        fs.copyFileSync(file, destPath);
    }
};

/**
 * Read Json object from json file.
 * @param {*} file 
 */
utilities.readJson = function (file) {
    file = sysPath.resolve(file);
    let content = fs.readFileSync(file);
    return JSON.parse(content);
};

module.exports = utilities;