const config = require("../config");
const scriptUtilities = require("../../scriptUtilities");

console.log("Start complieTsTest...", "\n");

let result = scriptUtilities.compileTs("let x: string  = 'string'", config.tsConfig);
console.log(result);
console.log(result['outputText']);

console.log("\nEnd complieTsTest.");