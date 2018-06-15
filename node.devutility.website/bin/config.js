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
        pageStyleNameFormat: '{page}.min.css',
        pageScriptNameFormat: '{page}.min.js'
    },
    directory: {
        pages: 'contents/pages',
        resources: {
            fonts: 'resources/fonts',
            images: 'resources/images',
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
        deploy: {
            fonts: 'dist/fonts',
            images: 'dist/images',
            styles: 'dist/stylesheets',
            scripts: 'dist/scripts'
        }
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
};

config.getForwardTarget = function () {
    return 'http://' + config.forward.host + ':' + config.forward.port;
};

config.getPageStyleName = function (page) {
    return config.compile.pageStyleNameFormat.replace(/{page}/, page);
};

config.getPageScriptName = function (page) {
    return config.compile.pageScriptNameFormat.replace(/{page}/, page);
};

module.exports = config;