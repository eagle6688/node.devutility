const fs = require("fs");
const path = require("path");

let path1 = path.resolve("test");
isFile(path1);
isDirectory(path1);

let path2 = path.resolve("asd");
isFile(path2);
isDirectory(path2);

function isFile(path) {
    console.log(fs.existsSync(path));
    let stat = fs.statSync(path);
    console.log(path, "is a file", stat.isFile());
}

function isDirectory(path) {
    let stat = fs.statSync(path);
    console.log(path, "is a directory", stat.isDirectory());
}