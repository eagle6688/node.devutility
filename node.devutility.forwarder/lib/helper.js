/**
 * Forward http request use http-proxy and querystring package.
 * 
 * @author: Aldwin Su
 * @date: 2018-06-07 14:54:41
 * @Copyright: 2018. All rights reserved.
 */

import extend from "extend";
import httpProxy from "http-proxy";
import defaults from "./defaults.js"

class Helper {
    constructor(options) {
        this.options = extend(true, {}, defaults, options);
        this.init();
    }

    init() {
        /**
         * Create a proxy server.
         */
        this.proxyServer = httpProxy.createProxyServer(this.options.proxyOptions);

        /**
         * Listen for `proxyReq` event on `proxy`.
         */
        this.proxyServer.on('proxyReq', this.proxyRequest);

        /**
         * Listen for `proxyRes` event on `proxy`.
         */
        this.proxyServer.on('proxyRes', this.proxyResponse);

        /**
         * Listen for `error` event on `proxy`.
         */
        this.proxyServer.on('error', this.error);
    }

    proxyRequest(proxyReq, request, response, options) {
        console.log('Event proxyReq was triggered, original URL:', request.url);

        if (this.options.proxyReq) {
            this.options.proxyReq(proxyReq, request, response, options);
        }
    }

    proxyResponse(proxyRes, req, res) {
        console.log('Response from the target server', JSON.stringify(proxyRes.headers, true, 4));

        if (this.options.proxyRes) {
            this.options.proxyRes(proxyRes, req, res);
        }
    }

    error(err, req, res) {
        console.error("Error from Node.js", err);

        if (this.options.error) {
            this.options.error(err, req, res);
        }
    }

    proxy(request, response) {
        delete request.headers.host;
        this.proxyServer.web(request, response);
    }

    proxyWS(req, socket, head) {
        this.proxyServer.ws(req, socket, head);
    }
}

export default Helper;