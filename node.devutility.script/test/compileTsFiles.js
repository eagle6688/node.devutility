const fs = require("fs");
const path = require("path");
const config = require("./config");
const scriptUtilities = require("../index");

console.log("Start complie ts files...", "\n");

let projectDirectory = process.cwd();
let tsFile = path.join(projectDirectory, "test", "resources", "layout.ts");
let result = scriptUtilities.compileTsFile(tsFile, config.tsConfig);
fs.writeFileSync("test/output/test.json", JSON.stringify(result));
fs.writeFileSync("test/output/test.js", result.outputText);

console.log("\nEnd complie ts files.");