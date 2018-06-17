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
 * @param {*} options 
 * @param {*} callback 
 */
httpUtilities.get = function (options, callback) {
    this.createHttpRequest(options, callback).end();
};

/**
 * Call http get method and return an promise object.
 * @param {*} options 
 */
httpUtilities.getPromise = function (options) {
    return new Promise((resolve, reject) => {
        httpUtilities.httpGet(options, response => {
            resolve(response);
        });
    }).catch(error => {
        console.log('Promise error:', error);
    });
};

/**
 * Http post method.
 * @param {*} options 
 * @param {*} data 
 * @param {*} callback 
 */
httpUtilities.post = function (options, data, callback) {
    let request = this.createHttpRequest(options, callback);

    if (options.method && typeof options.method == 'string' && options.method.toLowerCase() == 'post' && data) {
        request.write(data);
    }

    request.end();
};

/**
 * Create an ClientHttpRequest object.
 * @param {*} options 
 * @param {*} callback 
 */
httpUtilities.createHttpRequest = function (options, callback) {
    let request = http.request(options, (response) => {
        let rawData = '';
        response.setEncoding('utf8');

        response.on('data', (chunk) => {
            rawData += chunk;
        });

        response.on('end', () => {
            if (callback) {
                var result = {
                    statusCode: 0,
                    data: null
                };

                if (response) {
                    result.statusCode = response.statusCode;
                }

                if (rawData != '') {
                    result.data = JSON.parse(rawData);
                }

                callback(result);
            }
        });
    });

    request.on('error', function (e) {
        console.log("Request", options.path, "error,", e);
    });

    return request;
};

/**
 * Create a new request options object.
 * @param {*} hostname 
 * @param {*} port 
 * @param {*} path 
 * @param {*} cookies 
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