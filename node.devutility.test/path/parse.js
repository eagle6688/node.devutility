const sysPath = require("path");
console.log(sysPath.parse("/path"));
console.log(sysPath.parse("/path/parse.js"));

console.log(sysPath.parse("path/asd/qwe/parse.js"));
console.log(sysPath.parse("/path/asd/qwe/parse.js"));