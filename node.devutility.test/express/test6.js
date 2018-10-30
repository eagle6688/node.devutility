var fs = require("fs");
var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');

var app = express();
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(multer({
	dest: '/tmp/'
}).array('image'));

app.get('/test6.html', function (req, res) {
	res.sendFile(__dirname + "/" + "test6.html");
});

app.post('/file_upload', function (req, res) {
	console.log(req.files[0]); // 上传的文件信息
	var des_file = __dirname + "/" + req.files[0].originalname;

	fs.readFile(req.files[0].path, function (err, data) {
		fs.writeFile(des_file, data, function (err) {
			if (err) {
				console.log(err);
			} else {
				response = {
					message: 'File uploaded successfully',
					filename: req.files[0].originalname
				};
			}

			console.log(response);
			res.end(JSON.stringify(response));
		});
	});
});

var server = app.listen(8899, function () {
	var host = server.address().address
	var port = server.address().port
	console.log("应用实例，访问地址为 http://%s:%s", host, port);
});
