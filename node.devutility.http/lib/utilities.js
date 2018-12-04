/**
 * Http utilities.
 * 
 * @author: Aldwin Su
 * @date: 2018-06-07 14:54:41
 * @Copyright: 2018. All rights reserved.
 */

var http = require('http');
let httpUtilities = {};

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

    let request = this.createHttpRequest(options, success, error);

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
    let request = http.request(options, (response) => {
        let rawData = '';
        response.setEncoding('utf8');

        response.on('data', (chunk) => {
            rawData += chunk;
        });

        response.on('end', () => {
            if (success) {
                var result = {
                    statusCode: 0,
                    data: null
                };

                if (response) {
                    result.statusCode = response.statusCode;
                }

                if (rawData) {
                    try {
                        result.data = JSON.parse(rawData);
                    } catch (e) {
                        if (error) {
                            error(e);
                        }
                    }
                }

                success(result);
            }
        });
    });

    request.on('error', function (e) {
        if (error) {
            error(e);
        }
    });

    return request;
};

/**
 * Create a new request options object.
 */
httpUtilities.requestOptions = function (hostname, port, path, cookies) {
    let options = {
        hostname: hostname,
        port: port,
        path: path,
        headers: {}
    };

    if (cookies) {
        options.headers.Cookie = cookies;
    }

    return options;
};

module.exports = httpUtilities;