/**
 * IO operation utilities.
 * 
 * @author: Aldwin Su
 * @date: 2018-06-07 14:54:41
 * @Copyright: 2018. All rights reserved.
 */

let fs = require('fs');
let path = require("path");

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
    let dir = path.join(projectDirectory);

    for (let i = 0; i < array.length; i++) {
        dir = path.join(dir, array[i]);

        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }
    }
};

module.exports = ioUtilities;