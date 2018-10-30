var fs = require("fs");
var zlib = require('zlib');
var gZipStream = zlib.createGzip();
var gZipWriteStream = fs.createWriteStream('input.txt.gz');

// 压缩 input.txt 文件为 input.txt.gz
var readerStream = fs.createReadStream('input.txt');
readerStream.pipe(gZipStream).pipe(gZipWriteStream);
  
console.log("文件压缩完成。");