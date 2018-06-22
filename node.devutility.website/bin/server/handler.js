/**
 * Server business handler.
 */

const httpUtilities = require("utilities-http");
const collectionUtilities = require("utilities-collection");
const config = require("../config");

let handler = {};

handler.login = async function (request, response, next) {
    if (collectionUtilities.valueContainElement(config.url.whiteUrls, request.url)) {
        return next();
    }

    let options = config.getRequestOptions_baseData(request);
    let result = await httpUtilities.getPromise(options);

    if (!result || result.statusCode == 0 || result.statusCode == 401) {
        return response.redirect(config.url.login);
    }

    request.data = result;
    next();
};

handler.render = function (context, data) {
    let request = context[0];
    let response = context[1];

    if (!request.data) {
        data.baseData = request.data;
    }

    let pagePath = getPagePathByRequest(request);
    response.render(pagePath, data);
};

function getPageName(request) {
    let path = request.path;
    let array = path.split("/");
    return array[array.length - 1];
}

function getPagePath(pageName) {
    let format = "pages/{page}/index";
    return format.replace(/{page}/, pageName);
}

function getPagePathByRequest(request) {
    let pageName = getPageName(request);
    return getPagePath(pageName);
}

module.exports = handler;