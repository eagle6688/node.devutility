/**
 * Main file for application, used as an entrance.
 * 
 * @author: Aldwin Su
 * @date: 2018-06-07 14:54:41
 * @Copyright: 2018 Aldwin. All rights reserved.
 */

const http = require('http');
const config = require('./config');
const application = require("./server/main");

/**
 * Create a HTTP server and start it.
 */
var server = http.createServer(application);

server.on('listening', function () {
    console.log('Listening to port', config.port);
});

server.on('error', function (error) {
    console.log(error);
});

server.listen(config.port);