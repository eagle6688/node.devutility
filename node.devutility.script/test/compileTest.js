import config from "./config.js";
import scriptUtilities from "../index.js";

console.log("Start complieTest...", "\n");

let result = scriptUtilities.compileTs("let x: string  = 'string'", config.tsConfig);
console.log(result);
console.log(result['outputText']);

console.log("Finished complieTest.");