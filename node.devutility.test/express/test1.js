var express = require('express');
var app = express();

app.get('/', function (req, res) {
   res.send('Hello World');
});

var server = app.listen(8899, function () {
  var host = server.address().address
  var port = server.address().port
  console.log('web site: http://%s:%s', host, port);
});