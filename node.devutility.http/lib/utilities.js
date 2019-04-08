/**
 * Http utilities.
 * 
 * @author: Aldwin Su
 * @date: 2018-06-07 14:54:41
 * @Copyright: 2018. All rights reserved.
 */

var http = require('http');
var HttpResponse = require('./models/HttpResponse');
var httpUtilities = {};

/**
 * Http get method.
 */
httpUtilities.get = function (options, success, error) {
    this.createHttpRequest(options, success, error).end();
};

/**
 * Call http get method and return an promise object.
 */
httpUtilities.getPromise = function (options) {
    return new Promise((resolve, reject) => {
        httpUtilities.get(options, resolve, reject);
    });
};

/**
 * Http post method.
 */
httpUtilities.post = function (options, data, success, error) {
    if (options.method || typeof options.method != 'string' || options.method.toLowerCase() != 'post') {
        options.method = 'post';
    }

    var request = this.createHttpRequest(options, success, error);

    if (data) {
        request.write(data);
    }

    request.end();
};

/**
 * Call http post method and return an promise object.
 */
httpUtilities.postPromise = function (options) {
    return new Promise((resolve, reject) => {
        httpUtilities.post(options, resolve, reject);
    });
};

/**
 * Create an ClientHttpRequest object.
 */
httpUtilities.createHttpRequest = function (options, success, error) {
    var request = http.request(options, function (response) {
        var rawData = '';
        response.setEncoding('utf8');

        if (options.setResponse) {
            options.setResponse(response);
        }

        response.on('data', function (chunk) {
            rawData += chunk;
        });

        response.on('end', function () {
            var httpResponse = new HttpResponse(null, response.statusMessage, response.statusCode);

            if (rawData) {
                httpResponse.data = rawData;

                if (options.responseType == 'json') {
                    try {
                        httpResponse.data = JSON.parse(rawData);
                    } catch (e) {
                        httpResponse.statusCode = 422;
                        httpResponse.data = e;
                        httpUtilities.error(error, httpResponse);
                        return null;
                    }
                }
            }

            if (!httpResponse.isSucceeded()) {
                httpUtilities.error(error, httpResponse);
                return null;
            }

            httpUtilities.callback(success, httpResponse);
        });
    });

    if (options.setRequest) {
        options.setRequest(request);
    }

    request.on('error', function (e) {
        var httpResponse = new HttpResponse(e);
        httpUtilities.error(error, httpResponse);
    });

    request.on('timeout', function () {
        var httpResponse = new HttpResponse();
        httpResponse.statusCode = 408;
        httpResponse.message = 'Request ' + options.path + ' timeout!';
        httpUtilities.error(error, httpResponse);
    });

    return request;
};

/**
 * Create a new request options object.
 */
httpUtilities.requestOptions = function (hostname, port, path, cookies) {
    var options = {
        headers: {},
        hostname: hostname,
        port: port,
        path: path,
        timeout: 5000,
        timestamp: new Date().getTime(),
        responseType: 'json',
        setRequest: function (request) {},
        setResponse: function (response) {}
    };

    if (cookies) {
        options.headers.Cookie = cookies;
    }

    return options;
};

/**
 * Callback handle for http request.
 */
httpUtilities.callback = function (_callback, data) {
    if (_callback) {
        _callback(data);
    }
};

/**
 * Error handle for http request.
 */
httpUtilities.error = function (_callback, e) {
    if (!_callback) {
        throw e;
    }

    httpUtilities.callback(_callback, e);
};

module.exports = httpUtilities;