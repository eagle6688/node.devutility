import sysPath from "path";

let path1 = sysPath.resolve("asd");
display(path1, "path1");

let path2 = sysPath.resolve("asd/test.txt");
display(path2, "path2");

let path3 = sysPath.resolve("/asd");
display(path3, "path3");

function display(path, name) {
    console.log(name, ":", path);
    let pathInfo = sysPath.parse(path);

    if (pathInfo.ext == '') {
        console.log('Ext Null!');
    }

    console.log(path, pathInfo);
}