/**
 * Application configuration file.
 */

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
        server: {}
    }
};

config.getForwardOptions = function () {
    return {
        target: "http://" + config.forward.host + ":" + config.forward.port,
        changeOrigin: true
    };
};

module.exports = config;