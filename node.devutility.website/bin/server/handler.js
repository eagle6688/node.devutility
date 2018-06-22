/**
 * Server business handler.
 */

let handler = {};

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