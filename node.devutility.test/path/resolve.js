const sysPath = require("path");
let dir = "path/join-test.js";
console.log(sysPath.resolve(dir));
console.log(sysPath.resolve("path/resolve.js"));
console.log(sysPath.resolve("/path/resolve.js"));