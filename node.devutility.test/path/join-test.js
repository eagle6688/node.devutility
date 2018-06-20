const sysPath = require("path");
let dir = "path/join-test.js";
let path = sysPath.join(process.cwd(), dir);
console.log("path.join:", path);

console.log("path.resolve", sysPath.resolve(dir));