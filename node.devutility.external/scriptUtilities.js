/**
 * Javascript utilities.
 * 
 * @author: Aldwin Su
 * @date: 2018-06-07 14:54:41
 * @Copyright: 2018. All rights reserved.
 */

const fs = require("fs");
const uglifyJs = require("uglify-js");
const typescript = require("typescript");

let scriptUtilities = {};

/**
 * Compress js file if its name without .min.js
 * @param {*} file 
 */
scriptUtilities.compressJs = function (file) {
    let regex = /\.min.js$/;
    let content = fs.readFileSync(file).toString();

    if (regex.test(file)) {
        return content;
    }

    let result = uglifyJs.minify(content);
    return result.code;
};

scriptUtilities.compileTs = function () {

};

module.exports = scriptUtilities;