/**
 * Router for express.
 */

import { HttpProxyHelper } from "utilities-forwarder";
import config from "../config.js";
import Service from "./Service.js";

export default function (app, handler) {
    let httpProxyHelper = new HttpProxyHelper(config.getForwardOptions());

    app.get('/login', function (request, response, next) {
        let data = handler.getPageData("login");
        data.title = "Login";
        data.requireAuth = false;
        handler.render(arguments, data);
    });

    app.use(Service.login);

    app.get('/', function (request, response, next) {
        response.redirect('/index');
    });

    app.get('/index', function (request, response, next) {
        let data = handler.getPageData("index");
        data.title = "Index";
        data.requireAuth = true;
        handler.render(arguments, data);
    });

    app.use(function (request, response, next) {
        if (request.url.indexOf('/api') == 0) {
            request.url = request.url.replace(/\/api\//i, '/');
            httpProxyHelper.request(request, response);
        }
        else {
            var error = new Error("Not found request url: " + request.url);
            error.status = 404;
            next(error);
        }
    });

    app.use(function (err, req, res, next) {
        console.log("express error: ", err);
        res.status(err.status || 500);
        res.render('error', { title: 'Not Found', layout: false });
    });
};