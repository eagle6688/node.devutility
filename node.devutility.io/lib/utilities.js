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

        console.log(dir);

        if (dir && !fs.existsSync(dir)) {
            fs.mkdir(dir, err => {
                if (err) {
                    throw err;
                }
            });
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
    let _path = sysPath.resolve(path);
    let pathInfo = sysPath.parse(_path);

    if (!pathInfo.ext) {
        return sysPath.join(pathInfo.dir, pathInfo.base);
    }

    return pathInfo.dir;
};

/**
 * Path is file or not?
 * @param {*} path 
 */
utilities.isFile = function (path) {
    let _path = sysPath.resolve(path);
    let pathInfo = sysPath.parse(_path);

    if (pathInfo.ext) {
        return true;
    }

    return false;
};

/**
 * Synchronously copy files or directories from source to dest.
 * @param {*} source : File or directory.
 * @param {*} dest : File or directory.
 */
utilities.copy = function (source, dest) {
    let sourcePath = sysPath.resolve(source);
    let sourceStats = fs.statSync(sourcePath);
    let sourcePathInfo = sysPath.parse(sourcePath);

    let destPath = sysPath.resolve(dest);
    let destPathInfo = sysPath.parse(destPath);
    let destDirectory = utilities.getDirectory(destPath);

    if (destPathInfo.ext) {
        if (sourceStats.isFile()) {
            utilities.createDirectory(destDirectory);

            fs.copyFile(sourcePath, destPath, err => {
                if (err) {
                    throw err;
                }
            });

            return;
        }

        throw new Error("Source path " + source + " is not a file, but target path " + dest + " is.");
    }

    if (sourceStats.isFile()) {
        let fileDestPath = sysPath.join(destPath, sourcePathInfo.base);
        utilities.createDirectory(destDirectory);

        fs.copyFile(sourcePath, fileDestPath, err => {
            if (err) {
                throw err;
            }
        });

        return;
    }

    if (sourceStats.isDirectory()) {
        utilities.copyFiles(source, dest);
    }
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

        fs.copyFile(file, destPath, err => {
            if (err) {
                throw err;
            }
        });
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