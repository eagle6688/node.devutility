/**
 * Copy files or entire directory to target path.
 * If target path is a file, this module would overwrite it.
 * If target path is a directory, this module would copy "source" path into it.
 * 
 * @author: Aldwin Su
 * @Copyright: 2018. All rights reserved.
 */

const ioUtilities = require("utilities-io");

module.exports = function (configHelper) {
    let config = configHelper.options;
    let array = config.copy;

    for (let index in array) {
        let entry = array[index];

        if (entry.source && entry.target) {
            ioUtilities.copy(entry.source, entry.target);
            console.log("Copy source", entry.source, "to", entry.target);
        }
    }
};