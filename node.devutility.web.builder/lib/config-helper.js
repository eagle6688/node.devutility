/**
 * Application configuration file helper.
 */

let sysPath = require("path");
let projectDirectory = process.cwd();

function Helper(options) {
    this.options = options;
}

/* File name */

Helper.prototype.getPageStyleName = function (page) {
    return this.options.pages.styleNameFormat.replace(/{page}/, page);
};

Helper.prototype.getPageScriptName = function (page) {
    return this.options.pages.scriptNameFormat.replace(/{page}/, page);
};

/* File name end */

/* Path */

Helper.prototype.getStyleDirectory = function () {
    return sysPath.join(projectDirectory, this.options.deploy.stylesDir);
};

Helper.prototype.getScriptDirectory = function () {
    return sysPath.join(projectDirectory, this.options.deploy.scriptsDir);
};

Helper.prototype.getPageStylePath = function (page) {
    let fileName = this.getPageStyleName(page);
    return sysPath.join(projectDirectory, this.options.deploy.stylesDir, fileName);
};

Helper.prototype.getPageScriptPath = function (page) {
    let fileName = this.getPageScriptName(page);
    return sysPath.join(projectDirectory, this.options.deploy.scriptsDir, fileName);
};

/* Path end */

/* Url */

Helper.prototype.staticUrls = function () {
    let array = [];
    array.push("/" + this.options.deploy.fontsDir);
    array.push("/" + this.options.deploy.imagesDir);
    array.push("/" + this.options.deploy.stylesDir);
    array.push("/" + this.options.deploy.scriptsDir);
    return array;
};

Helper.prototype.pageStyleUrl = function (page) {
    return "/" + this.options.deploy.stylesDir + "/" + this.getPageStyleName(page);
};

Helper.prototype.scriptLibUrl = function () {
    return "/" + this.options.deploy.scriptsDir + "/" + this.options.deploy.scriptsLibName;
};

Helper.prototype.pageScriptUrl = function (page) {
    return "/" + this.options.deploy.scriptsDir + "/" + this.getPageScriptName(page);
};

/* Url end */

module.exports = function (options) {
    return new Helper(options);
};