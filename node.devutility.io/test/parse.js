const sysPath = require("path");

let path1 = sysPath.resolve("asd");
display(path1);

let path2 = sysPath.resolve("asd/test.txt");
display(path2);

function display(path) {
    let pathInfo = sysPath.parse(path);

    if (pathInfo.ext == '') {
        console.log('Ext Null!');
    }

    console.log(path, pathInfo);
}