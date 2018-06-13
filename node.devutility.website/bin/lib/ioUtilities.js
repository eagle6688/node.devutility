/**
 * IO operation utilities.
 * 
 * @author: Aldwin Su
 * @date: 2018-06-07 14:54:41
 * @Copyright: 2018. All rights reserved.
 */

let fs = require('fs');
let ioUtilities = {};

ioUtilities.createDirectory = function (directory) {
    if (!fs.existsSync(directory)) {
        fs.mkdirSync(directory);
    }
};

module.exports = ioUtilities;