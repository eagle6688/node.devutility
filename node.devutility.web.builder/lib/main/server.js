/**
 * Express server use handlebars view engine.
 * 
 * @author: Aldwin Su
 * @Copyright: 2018. All rights reserved.
 */

const fs = require('fs');
const http = require('http');
const sysPath = require("path");
const express = require('express');
const hbs = require('hbs');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const favicon = require('serve-favicon');
const Helper = require('../helper');

function Server(configer) {
    this.configer = configer;
    this.init();
}

Server.prototype.init = function () {
    let options = this.configer.options;
    this.port = options.port;
    this.app = options.server.express;

    if (!this.app) {
        this.app = express();
        this.init_app(options);
        this.register_static();
    }

    if (options.server.router) {
        let helper = new Helper(this.configer);
        options.server.router(this.app, helper);
    }

    this.server = http.createServer(this.app);

    this.server.on('listening', function () {
        console.log('Listening to port', options.port);
    });

    this.server.on('error', function (error) {
        console.log(error);
    });
};

Server.prototype.init_app = function () {
    // Set port
    this.app.set('port', this.port);

    // Handle cookie
    this.app.use(cookieParser());

    // Handle application/json
    this.app.use(bodyParser.json());

    // Handle application/x-www-form-urlencoded
    this.app.use(bodyParser.urlencoded({ extended: false }));

    // Set view path.
    this.app.set('views', this.configer.getViewsDirectory());

    // Set view engine.
    hbs.registerPartials(this.configer.getPartialsDirectory());
    this.app.set('view engine', 'hbs');
    this.app.engine('hbs', hbs.__express);

    // Set favicon.
    this.register_favicon();

    // Set default layout.
    let defaultLayout = this.configer.options.hbs.defaultLayout;

    if (defaultLayout) {
        this.app.set('view options', { layout: defaultLayout });
    }
};

Server.prototype.register_favicon = function () {
    let path = this.configer.getFaviconPath();

    if (fs.existsSync(path)) {
        this.app.use(favicon(path));
    }
};

Server.prototype.register_static = function () {
    let projectDirectory = process.cwd();
    let staticPaths = this.configer.getStaticPaths();

    for (let index in staticPaths) {
        let staticDir = sysPath.join(projectDirectory, staticPaths[index]);
        this.app.use(staticPaths[index], express.static(staticDir));
    }
};

Server.prototype.start = function () {
    this.server.listen(this.port);
};

module.exports = Server;