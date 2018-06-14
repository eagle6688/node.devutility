/**
 * Application configuration file.
 */

let config = {
    port: 8000,
    forward: {
        host: "127.0.0.1",
        port: 28003
    },
    compile: {
        jsLibName: 'libs.bundle.js',
        pageStyleName: '{page}.min.css'
    },
    directory: {
        pages: 'contents/pages',
        deploy: {
            fonts: 'dist/fonts',
            images: 'dist/images',
            styles: 'dist/stylesheets',
            scripts: 'dist/scripts'
        }
    }
};

config.getForwardTarget = function () {
    return 'http://' + config.forward.host + ':' + config.forward.port;
};

module.exports = config;