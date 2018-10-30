var fs = require('fs');
var statInfo = fs.statSync('input.txt');
console.log(statInfo);