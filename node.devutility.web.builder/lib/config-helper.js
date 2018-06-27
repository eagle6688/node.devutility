/**
 * Application configuration file helper.
 */

const sysPath = require("path");
const ioUtilities = require("utilities-io");
const projectDirectory = process.cwd();

function Helper(options) {
    this.options = options;
}

/* File name */

Helper.prototype.getPageStyleName = function (page) {
    return this.options.views.styleNameFormat.replace(/{page}/, page);
};

Helper.prototype.getPageScriptName = function (page) {
    return this.options.views.scriptNameFormat.replace(/{page}/, page);
};

/* File name end */

/* Directory */

Helper.prototype.getStyleDirectory = function () {
    return sysPath.join(projectDirectory, this.options.deploy.stylesDir);
};

Helper.prototype.getScriptDirectory = function () {
    return sysPath.join(projectDirectory, this.options.deploy.scriptsDir);
};

Helper.prototype.viewsDirectory = function () {
    return sysPath.join(projectDirectory, this.options.views.dir);
};

Helper.prototype.partialsDirectory = function () {
    return sysPath.join(projectDirectory, this.options.views.partials);
};

/* Directory end */

/* Path */

Helper.prototype.getPageStylePath = function (page) {
    let fileName = this.getPageStyleName(page);
    return sysPath.join(projectDirectory, this.options.deploy.stylesDir, fileName);
};

Helper.prototype.getPageScriptPath = function (page) {
    let fileName = this.getPageScriptName(page);
    return sysPath.join(projectDirectory, this.options.deploy.scriptsDir, fileName);
};

Helper.prototype.faviconPath = function () {
    return sysPath.join(projectDirectory, this.options.deploy.favicon);
};

/* Path end */

/* Url */

Helper.prototype.staticUrls = function () {
    let array = [];
    let host = this.options.deploy.host;
    array.push(host + this.options.deploy.fontsDir);
    array.push(host + this.options.deploy.imagesDir);
    array.push(host + this.options.deploy.stylesDir);
    array.push(host + this.options.deploy.scriptsDir);
    return array;
};

Helper.prototype.pageStyleUrl = function (page) {
    return this.options.deploy.host + this.options.deploy.stylesDir + "/" + this.getPageStyleName(page);
};

Helper.prototype.scriptLibUrl = function () {
    return this.options.deploy.host + this.options.deploy.scriptsDir + "/" + this.options.deploy.scriptsLibName;
};

Helper.prototype.pageScriptUrl = function (page) {
    return this.options.deploy.host + this.options.deploy.scriptsDir + "/" + this.getPageScriptName(page);
};

Helper.prototype.getPageData = function (page) {
    return {
        page: page,
        styles: [this.pageStyleUrl(page)],
        scripts: [this.scriptLibUrl(), this.pageScriptUrl(page)]
    };
};

/* Url end */

/* Webpack */

Helper.prototype.getEntry = function () {
    let result = {};
    let config = this.options;
    let pagePaths = ioUtilities.getDirectories(config.views.pages);

    for (let index in pagePaths) {
        let pagePath = pagePaths[index];
        let pageName = ioUtilities.getLastPath(pagePath);
        let scriptFiles = ioUtilities.getAllFiles(pagePath, config.views.scriptNameRegex);

        if (!scriptFiles || scriptFiles.length == 0) {
            continue;
        }

        if (scriptFiles.length > 1) {
            throw new Error("One page should only has one main typescript file which match the regex " + config.views.scriptNameRegex);
        }

        result[pageName] = scriptFiles[0];
    }

    return result;
};

Helper.prototype.getOutput = function () {
    let result = {};
    result.filename = this.options.views.scriptNameFormat.replace(/{page}/, '[name]');
    result.path = sysPath.resolve(this.options.deploy.scriptsDir);
    return result;
};

/* Webpack end */

module.exports = Helper;