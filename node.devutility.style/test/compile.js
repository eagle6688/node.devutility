const fs = require('fs');
const path = require("path");
const styleUtilies = require("../index");
const nodeSass = require('node-sass');

let inputFile = "";
let outputCss1 = path.resolve('test/output/test1.css');
let outputCss2 = path.resolve('test/output/test2.css');

nodeSass.render({
    file: inputFile
}, function (error, result) {
    fs.writeFile(outputCss1, result.css);
});

let result = styleUtilies.compile(inputFile);
console.log(result.stats);
fs.writeFile(outputCss2, result.css);