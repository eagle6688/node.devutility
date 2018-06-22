/**
 * Router for express.
 */

const httpUtilities = require("utilities-http");
const collectionUtilities = require("utilities-collection");

const Forwarder = require('utilities-forwarder');
const handler = require("./handler");

module.exports = function (app, helper, config) {
    let forwarder = Forwarder(config.getForwardOptions());

    app.use(async function (request, response, next) {
        if (collectionUtilities.valueContainElement(config.url.whiteUrls, request.url)) {
            return next();
        }

        let options = getRequestOptions_baseData(request, config);
        let result = await httpUtilities.getPromise(options);

        if (!result || result.statusCode == 0 || result.statusCode == 401) {
            return response.redirect(config.url.login);
        }

        request.data = result;
        next();
    });

    app.get('/', function (request, response, next) {
        response.redirect('/index');
    });

    app.get('/login', function (request, response, next) {
        let data = helper.getPageData();
        data.title = "Login";
        data.requireAuth = false;
        handler.render(arguments, data);
    });

    app.get('/index', function (request, response, next) {
        let data = helper.getPageData();
        data.title = "Index";
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

function getRequestOptions_baseData(request, options) {
    return httpUtilities.requestOptions(options.forward.host, options.forward.port, options.url.apis.baseDataUrl, request.headers.cookie);
}