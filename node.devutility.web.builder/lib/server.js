/**
 * Express server use handlebars view engine.
 */

const http = require('http');
const sysPath = require("path");

const express = require('express');
const hbs = require('hbs');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const favicon = require('serve-favicon');

let projectDirectory = process.cwd();

function Server(configer) {
    this.configer = configer;
    this.init();
}

Server.prototype.init = function () {
    let config = this.configer.options;
    this.port = config.port;
    this.app = config.server.express;

    if (!this.app) {
        this.app = express();
        this.init_app(config);
        this.register_static();
    }

    if (config.server.router) {
        config.server.router(this.app);
    }

    this.server = http.createServer(application);

    this.server.on('listening', function () {
        console.log('Listening to port', this.port);
    });

    this.server.on('error', function (error) {
        console.log(error);
    });
};

Server.prototype.init_app = function () {
    this.app.set('port', this.port);

    // Handle cookie
    this.app.use(cookieParser());

    // Handle application/json
    this.app.use(bodyParser.json());

    // Handle application/x-www-form-urlencoded
    this.app.use(bodyParser.urlencoded({ extended: false }));

    // Set view path.
    this.app.set('views', this.configer.viewsDirectory());

    // Set view engine.
    this.app.set('view engine', 'hbs');

    hbs.registerPartials(this.configer.partialsDirectory());
    this.app.engine('hbs', hbs.__express);

    // Set favicon.
    this.app.use(favicon(this.configer.faviconPath()));
};

Server.prototype.register_static = function () {
    let staticUrls = this.configer.staticUrls();

    for (let index in staticUrls) {
        let staticUrl = staticUrls[index];
        let staticDir = sysPath.join(projectDirectory, staticUrl);
        this.app.use(staticUrl, express.static(staticDir));
    }
};

Server.prototype.start = function () {
    this.server.listen(this.port);
};

module.exports = Server;