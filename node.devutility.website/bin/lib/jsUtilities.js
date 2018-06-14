/**
 * Javascript utilities.
 * 
 * @author: Aldwin Su
 * @date: 2018-06-07 14:54:41
 * @Copyright: 2018. All rights reserved.
 */

const fs = require("fs");
const path = require("path");
const uglifyJs = require("uglify-js");
const ts = require("typescript");

let jsUtilities = {};
let projectDirectory = process.cwd();

/**
 * Compress js file if its name without .min.js
 * @param {*} file 
 */
jsUtilities.compressJs = function (file) {
    let regex = /\.min.js$/;
    let content = fs.readFileSync(file).toString();

    if (regex.test(file)) {
        return content;
    }

    let result = uglifyJs.minify(content);
    return result.code;
};

jsUtilities.compileTs = function (tsFile) {
    console.log(tsFile)

    let name = "asd";
    let tsConfigFile = path.join(projectDirectory, "tsconfig.json");
    let tsConfigContent = fs.readFileSync(tsConfigFile);

    console.log(tsConfigContent.toString());

    let tsConfig = JSON.parse(tsConfigContent.toString());
    var configParseResult = ts.parseJsonConfigFileContent(tsConfig, ts.sys, path.dirname(tsConfigFile));
    let compilerOptions = configParseResult.options;
    compilerOptions.outFile = path.join(projectDirectory, name + ".js");

    console.log(compilerOptions.outFile)

    var compilerHost = ts.createCompilerHost(compilerOptions);
    var program = ts.createProgram([tsFile], compilerOptions, compilerHost);
    program.emit();
};

module.exports = jsUtilities;