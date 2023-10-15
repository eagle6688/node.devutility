/**
 * Http utilities.
 * 
 * @author: Aldwin Su
 * @date: 2018-06-07 14:54:41
 * @Copyright: 2018. All rights reserved.
 */

import http from "http";
import HttpResponse from "./models/HttpResponse.js"

let utilities = {};

/**
 * Http get method.
 */
utilities.get = function (options, success, error) {
    this.createHttpRequest(options, success, error).end();
};

/**
 * Call http get method and return an promise object.
 */
utilities.getPromise = function (options) {
    return new Promise((resolve, reject) => {
        utilities.get(options, resolve, reject);
    });
};

/**
 * Synchronized http get request.
 */
utilities.syncGet = function (options) {
    return utilities.getPromise(options).catch(error => {
        return error;
    });
};

/**
 * Http post method.
 */
utilities.post = function (options, data, success, error) {
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
utilities.postPromise = function (options) {
    return new Promise((resolve, reject) => {
        utilities.post(options, resolve, reject);
    });
};

/**
 * Synchronized http post request.
 */
utilities.syncPost = function (options) {
    return utilities.postPromise(options).catch(error => {
        return error;
    });
};

/**
 * Create an ClientHttpRequest object.
 */
utilities.createHttpRequest = function (options, success, error) {
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
                        utilities.error(error, httpResponse);
                        return null;
                    }
                }
            }

            if (!httpResponse.isSucceeded()) {
                utilities.error(error, httpResponse);
                return null;
            }

            utilities.callback(success, httpResponse);
        });
    });

    if (options.setRequest) {
        options.setRequest(request);
    }

    request.on('error', function (e) {
        var httpResponse = new HttpResponse(e);
        utilities.error(error, httpResponse);
    });

    request.on('timeout', function () {
        var httpResponse = new HttpResponse();
        httpResponse.statusCode = 408;
        httpResponse.message = 'Request ' + options.path + ' timeout!';
        utilities.error(error, httpResponse);
    });

    return request;
};

/**
 * Create a new request options object.
 */
utilities.requestOptions = function (hostname, port, path, cookies) {
    var options = {
        headers: {},
        hostname: hostname,
        port: port,
        path: path,
        timeout: 5000,
        timestamp: new Date().getTime(),
        responseType: 'json',
        setRequest: function (request) { },
        setResponse: function (response) { }
    };

    if (cookies) {
        options.headers.Cookie = cookies;
    }

    return options;
};

/**
 * Callback handle for http request.
 */
utilities.callback = function (_callback, data) {
    if (_callback) {
        _callback(data);
    }
};

/**
 * Error handle for http request.
 */
utilities.error = function (_callback, e) {
    if (!_callback) {
        throw e;
    }

    utilities.callback(_callback, e);
};

export default utilities;