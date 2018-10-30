var WebSocketServer = require('ws').Server;
ws = new WebSocketServer({host : '127.0.0.1', port : 8080});

ws.on('connection', function (ws) {
    console.log('client connected...');
	
	ws.send('Hello client!');
	
    ws.on('message', function (message) {
        console.log(message);
    });
});