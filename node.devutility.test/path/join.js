const sysPath = require("path");
let dir = "path/join-test.js";
console.log(sysPath.join(process.cwd(), dir));
console.log(sysPath.join(process.cwd(), "/path/resolve.js"));

console.log(sysPath.join('///foo', 'bar', '//baz/asdf', '/quux', '..'));