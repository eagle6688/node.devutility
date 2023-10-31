import fs from "fs";
import path from "path";
import nodeSass from "node-sass";
import styleUtilities from "../index.js";

let inputFile = path.resolve('test/resources/main.scss');
let outputCss1 = path.resolve('test/output/test1.css');
let outputCss2 = path.resolve('test/output/test2.css');

nodeSass.render({
    file: inputFile
}, function (error, result) {
    fs.writeFile(outputCss1, result.css, (err) => {
        if (err) {
            throw err;
        }

        console.log('The file has been saved!', outputCss1);
    });
});

let result = styleUtilities.compile(inputFile);

fs.writeFile(outputCss2, result.css, (err) => {
    if (err) {
        throw err;
    }

    console.log('The file has been saved!', outputCss1);
});

console.log(result.stats);
console.log("Completed!");