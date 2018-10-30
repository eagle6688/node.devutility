var net = require('net');

var client = net.createConnection({port: 8080}, function(){
	console.log('connected to server!');
	client.write('Hello, I am a client!');
});

client.on('data', function(data){
	console.log(data.toString());
	client.end();
});

client.on('end', function(){
	console.log('disconnected from server!');
});