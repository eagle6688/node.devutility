/**
 * Application configuration file.
 */

import httpUtilities from "utilities-http";

export default {
    forward: {
        host: "127.0.0.1",
        port: 5599
    },
    url: {
        login: '/login',
        whiteUrls: ['/login', '/api'],
        apis: {
            baseDataUrl: '/system/base-data'
        }
    },
    getForwardOptions: function () {
        let self = this;

        return {
            proxyOptions: {
                target: "http://" + self.forward.host + ":" + self.forward.port,
                changeOrigin: true
            }
        };
    },
    getRequestOptions_baseData(cookie) {
        return httpUtilities.requestOptions(this.forward.host, this.forward.port, this.url.apis.baseDataUrl, cookie);
    }
};