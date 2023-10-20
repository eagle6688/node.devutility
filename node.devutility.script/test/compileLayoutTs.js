import fs from "fs";
import path from "path";
import config from "./config.js";
import scriptUtilities from "../index.js";

const tsFileName = "layout.ts";
console.log("Start compiling ts file", tsFileName);

let projectDirectory = process.cwd();
let tsFile = path.join(projectDirectory, "test", "resources", tsFileName);
let result = scriptUtilities.compileTsFile(tsFile, config.tsConfig);
fs.writeFileSync("test/output/test.json", JSON.stringify(result));
fs.writeFileSync("test/output/test.js", result.outputText);

console.log("Compile ts file", tsFileName, "completed!");