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
    },
    builderConfig: {
        port: 8002,
        resources: {
            styles: [
                'resources/styles/bootstrap.min.css',
                'resources/styles/bootstrap-theme.min.css'
            ],
            scripts: [
                'resources/scripts/jquery.min.js',
                'resources/scripts/bootstrap.min.js',
                'resources/scripts/vue.min.js'
            ]
        },
        tsConfig: {
            "compilerOptions": {
                "module": "commonjs",
                "target": "es5",
                "allowJs": true
            },
            "exclude": [
                "node_modules"
            ]
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