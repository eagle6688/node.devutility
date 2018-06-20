/**
 * Application configuration file helper.
 */

let sysPath = require("path");
let projectDirectory = process.cwd();

function Helper(options) {
    this.options = options;
}

// File name

Helper.prototype.getPageStyleName = function (page) {
    return this.options.pages.styleNameFormat.replace(/{page}/, page);
};

Helper.prototype.getPageScriptName = function (page) {
    return this.options.pages.scriptNameFormat.replace(/{page}/, page);
};

// File name end

// Path

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

// Path end

module.exports = function (options) {
    return new Helper(options);
};