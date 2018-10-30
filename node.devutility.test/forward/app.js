var http = require('http');
var url = require('url');
var port = 3002;

var backendOptions = {
    host: '10.100.97.64',
    port: 80
};

var app = http.createServer(function (request, response) {
    var urlObj = url.parse(request.url);
    var backendURL = getBackendUrl(urlObj);
    var method = request.method;

    var options = {
        host: backendOptions.host,
        port: backendOptions.port,
        method: method,
        path: backendURL
    };

    var backendRequest = http.request(options, function (backendResponse) {
        backendResponse.pipe(response);
    }).on('error', function (e) {
        var message = handleError(backendURL, e);
        console.log(message);
    });

    if (/POST|PUT/i.test(method)) {
        request.pipe(backendRequest);
    }
    else {
        backendRequest.end();
    }
});

var getBackendUrl = function (urlObj) {
    var url = urlObj.pathname;

    if (urlObj.search) {
        url += urlObj.search;
    }

    return url;
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

app.listen(port);
console.log("Server runing at port: " + port + "...");