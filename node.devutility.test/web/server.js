var http = require('http');
var fs = require('fs');
var url = require('url');

var onRequest = function(request, response) {
	console.log('Capturing request ' + request.url);
	var parsedUrl = url.parse(request.url, true);
	var query = getParameters(parsedUrl);
	process(parsedUrl, response);
};

var getParameters = function(parsedUrl){
	var query = parsedUrl.query;
	console.log('query string: ');
	
	for(key in query){
		console.log(key + ': ' + query[key]);
	}
	
	return query;
};

var process = function(parsedUrl, response){
	var pathname = parsedUrl.pathname;
	var fileName = pathname.substr(1);
	
	if(fileName.indexOf('.html') > 0) {
		handleText(response, fileName);
	}
	else if(fileName.indexOf('.ico') > 0) {
		handleBinary(response, fileName);
	}
};

var handleText = function(response, fileName){
	var body = '';
	var readStream = fs.createReadStream(fileName);
	
	readStream.on('error', function(err){
		console.log(err.stack);
		serverResponse(response, 404, body);
    });
	
	//every chuck's size is 63792
	readStream.on('data', (chunk) => {
        body += chunk;
    });
	
	readStream.on('end', function(){
		serverResponse(response, 200, body);
	});
};

var handleBinary = function(response, fileName){
	fs.stat(fileName, function(err, stats){
		if(err){
			console.log(err);
			response.end();
			return;
		}
		
		console.log(fileName + '\'s size is %d bytes.', stats.size);
		var index = 0;
		var buffer = new Buffer(stats.size);
		var readStream = fs.createReadStream(fileName);
		
		readStream.on('error', function(err){
		    console.log(err.stack);
		    serverResponse(response, 404, '');
        });
	
		//every chuck's size is 63792
		readStream.on('data', (chunk) => {
			chunk.copy(buffer, index);
			index += chunk.length;
		});
		
		readStream.on('end', function(){
			serverResponse(response, 200, buffer, 'binary');
		});
	});
};

var serverResponse = function(response, statusCode, body, encoding){
	response.statusCode = statusCode;
	response.setHeader('Content-Type', 'text/html');
	
	if(!encoding){
		encoding = 'utf8';
	}
	
	response.write(body.toString(), encoding);
    response.end();
};

http.createServer(onRequest).listen(8899);
console.log('Start web server at port 8899...');