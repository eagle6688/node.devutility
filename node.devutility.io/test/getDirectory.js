const sysPath = require("path");
const utilities = require("../index");
console.log(utilities.getDirectory(sysPath.resolve("asd")));
console.log(utilities.getDirectory(sysPath.resolve("asd/test.txt")));

console.log(utilities.getDirectory("asd"));
console.log(utilities.getDirectory("asd/test.txt"));
console.log(sysPath.resolve("d:\\Node Projects\\node.devutility\\node.devutility.io\\asd"));