/**
 * Javascript utilities.
 * 
 * @author: Aldwin Su
 * @date: 2018-06-07 14:54:41
 * @Copyright: 2018. All rights reserved.
 */

import fs from "fs";
import uglifyJs from "uglify-js";
import typescript from "typescript";

let utilities = {
    commentFormat: "/*!\n * Script file: {file}\n */\n"
};

utilities.getComment = function (file) {
    return utilities.commentFormat.replace(/{file}/, file);
};

/**
 * Compress js file if its name without .min.js
 * @param {*} file 
 */
utilities.compressJs = function (file) {
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
utilities.compileTs = function (tsContent, tsConfig) {
    return typescript.transpileModule(tsContent, tsConfig);
};

/**
 * Compile typescript file to javascript content.
 * @param {*} tsFile 
 * @param {*} tsConfig 
 */
utilities.compileTsFile = function (tsFile, tsConfig) {
    let content = fs.readFileSync(tsFile).toString();
    return utilities.compileTs(content, tsConfig);
};

export default utilities;