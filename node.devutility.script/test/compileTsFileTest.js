const config = require("./config");
const scriptUtilities = require("../index");
const path = require("path");

console.log("Start complieTsTest...", "\n");

let projectDirectory = process.cwd();
let tsFile = path.join(projectDirectory, "test", "test.ts");
let result = scriptUtilities.compileTsFile(tsFile, config.tsConfig);
console.log(result);
console.log(result.outputText);

console.log("\nEnd complieTsTest.");