/**
 * Router for express.
 */

const handler = require("./handler");

module.exports = function (app, helper, config) {
    app.use(handler.login);

    app.get('/', function (request, response, next) {
        response.redirect('/index');
    });

    app.get('/login', function (request, response, next) {
        let data = handler.getPageData(request, "Login");
        data.requireAuth = false;
        handler.render(arguments, data);
    });

    app.get('/index', function (request, response, next) {
        let data = handler.getPageData(request, "Index");
        data.requireAuth = true;
        handler.render(arguments, data);
    });

    // Catch api and 404 request.
    app.use(function (request, response, next) {
        if (request.url.indexOf('/api') == 0) {
            request.url = request.url.replace(/\/api\//i, '/');
            forwarder.request(request, response);
        }
        else {
            var error = new Error('Not Found');
            error.status = 404;
            next(error);
        }
    });

    // Error handler
    app.use(function (err, req, res, next) {
        console.log("express error: ", err);
        res.status(err.status || 500);
        res.render('error', { title: 'Not Found', layout: false });
    });
};