/**
 * Router for express.
 */

const Forwarder = require("utilities-forwarder");
const handler = require("./handler");
const config = require("../config");

module.exports = function (app, helper) {
    let forwarder = Forwarder(config.getForwardOptions());
    app.use(handler.login);

    app.get('/', function (request, response, next) {
        response.redirect('/index');
    });

    app.get('/login', function (request, response, next) {
        let data = helper.getPageData("login");
        data.title = "Login";
        data.requireAuth = false;
        handler.render(arguments, data);
    });

    app.get('/index', function (request, response, next) {
        let data = helper.getPageData("index");
        data.title = "Index";
        data.requireAuth = true;
        handler.render(arguments, data);
    });

    app.use(function (request, response, next) {
        if (request.url.indexOf('/api') == 0) {
            request.url = request.url.replace(/\/api\//i, '/');
            forwarder.request(request, response);
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