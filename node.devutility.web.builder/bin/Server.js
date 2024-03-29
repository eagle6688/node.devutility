/**
 * Express server use handlebars view engine.
 * 
 * @author: Aldwin Su
 * @Copyright: 2018. All rights reserved.
 */

import fs from "fs";
import http from "http";
import sysPath from "path";
import express from "express";
import hbs from "hbs";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import favicon from "serve-favicon";
import { Logger } from "utilities-common";

class Server {
    constructor(container, handler) {
        this.logger = Logger.create("node.devutility.web.builder/bin/Server.js");
        this.container = container;
        this.handler = handler;
        this.init();
    }

    init() {
        this.port = this.container.getPort();
        this.init_express();
        this.init_server();
    }

    init_express() {
        let options = this.container.getOptions();
        this.app = options.server.express;

        if (this.app) {
            return;
        }

        // Init express.
        this.app = express();

        // Set view engine.
        this.app.set('view engine', 'hbs');
        this.app.engine('hbs', hbs.__express);

        // Set port.
        this.app.set('port', this.port);

        // Set views.
        this.app.set('views', this.handler.getViewsDirectory());

        // Set default layout.
        if (options.hbs.defaultLayout) {
            this.app.set('view options', {
                layout: options.hbs.defaultLayout
            });
        }

        // Handle cookie.
        this.app.use(cookieParser());

        // Handle application/json.
        this.app.use(bodyParser.json());

        // Handle application/x-www-form-urlencoded.
        this.app.use(bodyParser.urlencoded({
            extended: false
        }));

        // Register partials.
        this.register_partials();

        // Register static.
        this.register_static();

        // Set favicon.
        this.register_favicon();

        if (options.server.router) {
            options.server.router(this.app, this.container);
        }
    }

    register_partials() {
        let directories = this.handler.getPartialsDirectories();

        for (let index in directories) {
            hbs.registerPartials(directories[index]);
        }
    }

    register_static() {
        let projectDirectory = process.cwd();
        let staticPaths = this.handler.getStaticPaths();

        for (let index in staticPaths) {
            let staticDir = sysPath.join(projectDirectory, staticPaths[index]);
            this.app.use(staticPaths[index], express.static(staticDir));
        }
    }

    register_favicon() {
        let path = this.handler.getFaviconPath();

        if (fs.existsSync(path)) {
            this.app.use(favicon(path));
        }
    }

    init_server() {
        let self = this;
        this.server = http.createServer(this.app);

        this.server.on('listening', function () {
            self.logger.info('Listening on port:', self.port);
        });

        this.server.on('error', function (error) {
            self.logger.info('Listening error:', error);
        });
    }

    start() {
        this.server.listen(this.port);
    }
}

export default Server;
