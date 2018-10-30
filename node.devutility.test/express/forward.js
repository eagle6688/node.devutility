var http = require('http');
var stream = require("stream");
var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var app = express();

var appConfig = {
    port: 8899,
    backend: {
        host: 'localhost',//'10.100.97.64',
        port: 8080
    }
};

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(session({
    name: 'JSESSIONID',
    secret: 'forward test',
    cookie: { maxAge: 30 * 60 * 1000 }
}));

// views path
app.use(express.static('views'));

app.use(function (request, response) {
    console.log(request.url);
    console.log(request.session);
    console.log(request.headers);
    console.log(request.params);
    console.log(request.body);

    if (request.url.indexOf('/api') == 0) {
        forwardRequest(request, response);
    }
});

var forwardRequest = function (request, response) {
    if (/post/i.test(request.method)) {
        forwardPost(request, response);
        return;
    }

    forwardGet(request, response);
};

var forwardGet = function (request, response) {
    var options = createRequestOptions(request);
    var backendRequest = createForwardRequest(options, response);
    backendRequest.end();
};

var forwardPost = function (request, response) {
    var contentType = request.headers['content-type'];

    if (contentType.indexOf('application/json') > -1) {
        forwardPostJson(request, response);
        return;
    }

    if (contentType.indexOf('multipart/form-data') > -1) {
        forwardPostMultipart(request, response);
    }
};

var forwardPostJson = function (request, response) {
    var options = createRequestOptions(request);
    var backendRequest = createForwardRequest(options, response);

    if (request.body) {
        var postData = JSON.stringify(request.body);
        backendRequest.write(postData);
    }

    backendRequest.end();
};

var forwardPostMultipart = function (request, response) {
    var options = createRequestOptions(request);
    var backendRequest = createForwardRequest(options, response);
    request.pipe(backendRequest);
};

var createRequestOptions = function (request) {
    return {
        host: appConfig.backend.host,
        port: appConfig.backend.port,
        method: request.method,
        headers: request.headers,
        path: request.url.replace(/\/api/i, '')
    };
};

var createForwardRequest = function (options, response) {
    var backendRequest = http.request(options, function (backendResponse) {
        backendResponse.pipe(response);
    });

    backendRequest.on('response', function (backendResponse) {
        response.set(backendResponse.headers);
    });

    backendRequest.on('error', function (e) {
        var message = handleError(options.path, e);
        console.log(message);
    });

    return backendRequest;
};

var handleError = function (url, error) {
    var array = [];

    array.push('request url: ');
    array.push(url);
    array.push('; ');

    array.push('Error: ');
    array.push(error.message);

    return array.join('');
};

var server = app.listen(appConfig.port, function () {
    console.log('Start listening port: %d', appConfig.port);
});