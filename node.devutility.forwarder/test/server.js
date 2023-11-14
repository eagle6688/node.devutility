/**
 * Test step 1: Start main server in ./node.devutility.test/http/server folder
 * Test step 2: npm run test in cmd
 * Test step 3: All request for http://127.0.0.1:9501 will forward to http://127.0.0.1:8000
 */
import { HttpProxyHelper } from "../index.js"
import http from "http";

const httpProxyHelper = new HttpProxyHelper({
    proxyOptions: {
        target: 'http://127.0.0.1:8000'
    }
});

const port = 9501;

http.createServer(function (req, res) {
    httpProxyHelper.proxy(req, res);
}).listen(port);

console.log("HTTP server is listening at port", port, "....");