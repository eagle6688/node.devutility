const config = require("./config");
const scriptUtilities = require("../index");
const path = require("path");
const tsFileName = "test.ts";

console.log("Start compiling ts file", tsFileName);

let projectDirectory = process.cwd();
let tsFile = path.join(projectDirectory, "test", "resources", tsFileName);
let result = scriptUtilities.compileTsFile(tsFile, config.tsConfig);
console.log(result);
console.log(result.outputText);

console.log("Compile ts file", tsFileName, "completed!");