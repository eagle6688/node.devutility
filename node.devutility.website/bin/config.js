/**
 * Application configuration file.
 */

let config = {
    port: 8000,
    forward: {
        host: "127.0.0.1",
        port: 8001
    },
    url: {
        login: '/login',
        apis: {
            baseDataUrl: '/system/base-data'
        },
        whiteUrls: ['/login', '/api']
    },
    compile: {
        jsLibName: 'libs.bundle.js',
        pageStyleNameFormat: '{page}.min.css',
        pageScriptNameFormat: '{page}.min.js'
    },
    directory: {
        views: 'views',
        pages: 'views/pages',
        partials: 'views/partials',
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
            root: "dist",
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

let sysPath = require("path");
let httpUtilities = require("utilities-http");
let projectDirectory = process.cwd();

config.getPageStyleName = function (page) {
    return config.compile.pageStyleNameFormat.replace(/{page}/, page);
};

config.getPageScriptName = function (page) {
    return config.compile.pageScriptNameFormat.replace(/{page}/, page);
};

config.viewsPath = function () {
    return sysPath.join(projectDirectory, config.directory.views);
};

config.partialsPath = function () {
    return sysPath.join(projectDirectory, config.directory.partials);;
};

config.faviconPath = function () {
    return sysPath.join(projectDirectory, config.directory.deploy.images, "favicon.ico");
};

config.staticPath = function () {
    return sysPath.join(projectDirectory, config.directory.deploy.root);
};

/* Url start */

config.staticUrl = function () {
    return "/" + config.directory.deploy.root;
};

config.pageStyleUrl = function (page) {
    return "/" + config.directory.deploy.styles + "/" + config.getPageStyleName(page);
};

config.libScriptUrl = function () {
    return "/" + config.directory.deploy.scripts + "/" + config.compile.jsLibName;
};

config.pageScriptUrl = function (page) {
    return "/" + config.directory.deploy.scripts + "/" + config.getPageScriptName(page);
};

/* Url end */

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