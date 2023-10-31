import path from "path";
import config from "./config.js";
import scriptUtilities from "../index.js";
const tsFileName = "test.ts";

console.log("Start compiling ts file", tsFileName);

let projectDirectory = process.cwd();
let tsFile = path.join(projectDirectory, "test", "resources", tsFileName);
let result = scriptUtilities.compileTsFile(tsFile, config.tsConfig);
console.log(result);
console.log(result.outputText);

console.log("Compile ts file", tsFileName, "completed!");