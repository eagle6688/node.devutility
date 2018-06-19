/**
 * Server business handler.
 */
const config = require("../config");
const httpUtilities = require("../../../node.devutility.internal/httpUtilities");
const collectionUtilities = require("../../../node.devutility.internal/collectionUtilities");

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

handler.getPageName = function (request) {
    let path = request.path;
    let array = path.split("/");
    return array[array.length - 1];
};

handler.getPageData = function (request, title) {
    let pageName = this.getPageName(request);

    let data = {
        styles: [config.pageStyleUrl(pageName)],
        scripts: [config.libScriptUrl(), config.pageScriptUrl(pageName)]
    };

    if (!request && !request.data) {
        data.baseData = request.data;
    }

    if (title) {
        data.title = title;
    }

    return data;
};

handler.render = function (context, data) {
    let request = context[0];
    let response = context[1];
    let pageName = this.getPageName(request);
    let pagePathFormat = "pages/{page}/index";
    response.render(pagePathFormat.replace(/{page}/, pageName), data);
};

module.exports = handler;