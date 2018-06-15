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

let scriptUtilities = {
    commentFormat: "/*!\n * Script file: {file}\n */\n"
};

scriptUtilities.getComment = function (file) {
    return scriptUtilities.commentFormat.replace(/{file}/, file);
};

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

/**
 * Complie typescript content to javascript content.
 * @param {*} tsContent 
 * @param {*} tsConfig 
 */
scriptUtilities.compileTs = function (tsContent, tsConfig) {
    return typescript.transpileModule(tsContent, tsConfig);
};

/**
 * Compile typescript file to javascript content.
 * @param {*} tsFile 
 * @param {*} tsConfig 
 */
scriptUtilities.compileTsFile = function (tsFile, tsConfig) {
    let content = fs.readFileSync(tsFile).toString();
    return this.compileTs(content, tsConfig);
};

module.exports = scriptUtilities;