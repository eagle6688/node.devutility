/**
 * Forward http request use http-proxy and querystring package.
 * 
 * @author: Aldwin Su
 * @date: 2018-06-07 14:54:41
 * @Copyright: 2018. All rights reserved.
 */

const extend = require("extend");
const httpProxy = require("http-proxy");
const querystring = require("querystring");
const defaults = require("./defaults");

function Helper(options) {
    this.options = extend(true, {}, defaults, options);
    this.init();
}

Helper.prototype.init = function () {
    /**
     * Create a proxy server.
     */
    this.proxy = httpProxy.createProxyServer(this.options);

    /**
     * Listen for the `proxyReq` event on `proxy`.
     */
    this.proxy.on('proxyReq', this.proxyReq);

    /**
     * Listen for the `proxyRes` event on `proxy`.
     */
    this.proxy.on('proxyRes', function (proxyRes, req, res) {
        console.log('Response from the target', JSON.stringify(proxyRes.headers, true, 4));
    });

    /**
     * Listen for the `error` event on `proxy`.
     */
    this.proxy.on('error', function (err, req, res) {
        console.log(err);
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('System error, this message comes from node.js server!');
    });
};

Helper.prototype.proxyReq = function (proxyReq, request, response, options) {
    console.log('Event proxyReq was triggered for request url:', request.url);

    if ((/post/i.test(request.method) || /patch/i.test(request.method)) && request.body) {
        var bodyData = request.body;
        var contentType = request.headers['content-type'];
        console.log("contentType:", contentType);

        if (typeof (bodyData) == 'string') {
            forwardData(proxyReq, bodyData);
            return;
        }

        if (contentType) {
            if (contentType.indexOf('application/json') > -1) {
                forwardData(proxyReq, JSON.stringify(bodyData));
                return;
            }

            if (contentType.indexOf('application/x-www-form-urlencoded') > -1) {
                forwardData(proxyReq, querystring.stringify(bodyData));
                return;
            }
        } else {
            forwardData(proxyReq, querystring.stringify(bodyData));
            return;
        }
    }
};

Helper.prototype.request = function (request, response) {
    delete request.headers.host;
    this.proxy.web(request, response);
};

/**
 * Use proxy for forward data to target.
 */
var forwardData = function (proxyReq, data) {
    if (!data || typeof (data) != 'string') {
        return;
    }

    proxyReq.setHeader('Content-Length', Buffer.byteLength(data));
    proxyReq.write(data);
};

module.exports = Helper;