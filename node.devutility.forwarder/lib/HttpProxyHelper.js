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
import Validator from "./Validator.js";
import { Logger } from "utilities-common";

class ProxyHelper {
    constructor(options) {
        this.options = extend(true, {}, defaults, options);
        this.#verify();
        this.#init();
    }

    isDebug() {
        return this.options.debug;
    }

    getOptions() {
        return this.options;
    }

    proxy(req, res) {
        this.proxyServer.web(req, res);
    }

    #verify() {
        Validator.build().verify(this.options);
    }

    #init() {
        /**
         * Logger
         */
        this.logger = new Logger('ProxyHelper.js');

        /**
         * Create a proxy server.
         */
        this.proxyServer = httpProxy.createProxyServer(this.options.proxyOptions);

        /**
         * Register event
         */
        this.#register_event();
    }

    #register_event() {
        let self = this;

        /**
         * Listen for `error` event on `proxy`.
         */
        this.proxyServer.on('error', (err, req, res) => {
            self.#error(self, err, req, res);
        });

        /**
         * Listen for `proxyReq` event on `proxy`.
         */
        this.proxyServer.on('proxyReq', (proxyReq, req, res, options) => {
            self.#proxyRequest(self, proxyReq, req, res, options);
        });

        /**
         * Listen for `proxyRes` event on `proxy`.
         */
        this.proxyServer.on('proxyRes', (proxyRes, req, res) => {
            self.#proxyResponse(self, proxyRes, req, res);
        });

        /**
         * Log HTTP forward information.
         */
        this.logger.info("HTTP request will forward to", this.options.proxyOptions.target);
    }

    /* Events */

    #proxyRequest(helper, proxyReq, req, res, options) {
        if (helper.isDebug()) {
            this.logger.debug("Event 'proxyReq' was triggered, request URL: ", req.url, ", headers: ", JSON.stringify(req.rawHeaders, true, 4));
        }

        if (helper.options.proxyReq) {
            helper.options.proxyReq(proxyReq, req, res, options);
        }
    }

    #proxyResponse(helper, proxyRes, req, res) {
        if (helper.isDebug()) {
            this.logger.debug("Response from the target server", JSON.stringify(proxyRes.headers, true, 4));
        }

        if (helper.options.proxyRes) {
            helper.options.proxyRes(proxyRes, req, res);
        }
    }

    #error(helper, err, req, res) {
        this.logger.error("Error from Node.js", err);

        if (helper.options.error) {
            helper.options.error(err, req, res);
        }
    }

    /* Events end */
}

export default ProxyHelper;