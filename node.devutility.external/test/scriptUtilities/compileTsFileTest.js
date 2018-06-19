const config = require("../config");
const scriptUtilities = require("../../lib/scriptUtilities");
const path = require("path");

console.log("Start complieTsTest...", "\n");

let projectDirectory = process.cwd();
let tsFile = path.join(projectDirectory, "test", "scriptUtilities", "test.ts");
let result = scriptUtilities.compileTsFile(tsFile, config.tsConfig);
console.log(result);
console.log(result.outputText);

console.log("\nEnd complieTsTest.");