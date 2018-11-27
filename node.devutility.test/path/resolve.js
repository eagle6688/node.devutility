const sysPath = require("path");

console.log(sysPath.resolve());

let dir = "path/join-test.js";
console.log(sysPath.resolve(dir));
console.log(sysPath.resolve("path/resolve.js"));
console.log(sysPath.resolve("/path/resolve.js"));

console.log(sysPath.resolve('/'));
console.log(sysPath.resolve('./'));
console.log(sysPath.resolve('../'));
console.log(sysPath.resolve('.../'));