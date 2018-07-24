const fs = require('fs');
const path = require("path");
const styleUtilies = require("../index");
const nodeSass = require('node-sass');

nodeSass.render({
    file: ''
}, function (error, result) {
    fs.writeFile("test.css", result.css);
});