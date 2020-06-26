const config = require("./config");
const scriptUtilities = require("../index");

console.log("Start complieTest...", "\n");

let result = scriptUtilities.compileTs("let x: string  = 'string'", config.tsConfig);
console.log(result);
console.log(result['outputText']);

console.log("Finished complieTest.");