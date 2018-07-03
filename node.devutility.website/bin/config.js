/**
 * Application configuration file.
 */

const httpUtilities = require("utilities-http");

let config = {
    forward: {
        host: "127.0.0.1",
        port: 8001
    },
    url: {
        login: '/login',
        whiteUrls: ['/login', '/api'],
        apis: {
            baseDataUrl: '/system/base-data'
        }
    }
};

config.getForwardOptions = function () {
    return {
        target: "http://" + config.forward.host + ":" + config.forward.port,
        changeOrigin: true
    };
};

config.getRequestOptions_baseData = function (request) {
    return httpUtilities.requestOptions(config.forward.host, config.forward.port, config.url.apis.baseDataUrl, request.headers.cookie);
};

module.exports = config;