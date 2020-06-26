/**
 * Test step 1: Start main server in ./node.devutility.test/http/server folder
 * Test step 2: npm run test in cmd
 * Test step 3: All request for http://127.0.0.1:9501 will forward to http://127.0.0.1:3000
 */
const http = require("http");
const port = 9501;

const forwarder = require("../index")({
    target: 'http://127.0.0.1:3000'
});

http.createServer(function (req, res) {
    forwarder.request(req, res);
}).listen(port);

console.log("HTTP server is listening at port", port, "....");