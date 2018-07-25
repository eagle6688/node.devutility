/**
 * Application configuration file helper.
 */

const sysPath = require("path");
const ioUtilities = require("utilities-io");
const PageResource = require("./PageResource");
const projectDirectory = process.cwd();

function Helper(options) {
    this.options = options;
    this.resources = [];
}

/* File name */

Helper.prototype.getPageStyleName = function (page) {
    return this.options.app.styleNameFormat.replace(/{page}/, page);
};

Helper.prototype.getPageScriptName = function (page) {
    return this.options.app.scriptNameFormat.replace(/{page}/, page);
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
    return sysPath.join(projectDirectory, this.options.app.dir);
};

Helper.prototype.partialsDirectory = function () {
    return sysPath.join(projectDirectory, this.options.app.partials);
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

Helper.prototype.styleLibUrl = function () {
    return this.options.deploy.host + this.options.deploy.stylesDir + "/" + this.options.deploy.stylesLibName;
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
    let data = {
        page: page,
        styles: [],
        scripts: []
    };

    if (this.hasStyleLibs()) {
        let styleLibsUrl = this.styleLibUrl();
        data.styles.push(styleLibsUrl);
    }

    if (this.hasScriptLibs()) {
        let scriptLibsUrl = this.scriptLibUrl();
        data.scripts.push(scriptLibsUrl);
    }

    let pageResource = this.getPageResource(page);

    if (pageResource != null) {
        data.styles.push(pageResource.styles);
        data.scripts.push(pageResource.scripts);
    }

    return data;
};

/* Url end */

/* Webpack */

Helper.prototype.getEntry = function () {
    let result = {};
    let config = this.options;
    let pagePaths = ioUtilities.getDirectories(config.app.pages);

    for (let index in pagePaths) {
        let pagePath = pagePaths[index];
        let pageName = ioUtilities.getLastPath(pagePath);
        let scriptFiles = ioUtilities.getAllFiles(pagePath, config.app.scriptNameRegex);

        if (!scriptFiles || scriptFiles.length == 0) {
            continue;
        }

        if (scriptFiles.length > 1) {
            throw new Error("One page should only has one main typescript file which match the regex " + config.app.scriptNameRegex);
        }

        result[pageName] = scriptFiles[0];
    }

    return result;
};

Helper.prototype.getOutput = function () {
    let result = {};
    result.filename = this.options.app.scriptNameFormat.replace(/{page}/, '[name]');
    result.path = sysPath.resolve(this.options.deploy.scriptsDir);
    return result;
};

/* Webpack end */

/* Resource */

Helper.prototype.hasStyleLibs = function () {
    let styles = this.options.resources.styles;
    return styles && styles.length > 0;
};

Helper.prototype.hasScriptLibs = function () {
    let scripts = this.options.resources.scripts;
    return scripts && scripts.length > 0;
};

Helper.prototype.getPageResource = function (page) {
    for (let index in this.resources) {
        let pageResource = this.resources[index];

        if (pageResource.page == page) {
            return pageResource;
        }
    }

    return null;
};

Helper.prototype.createPageResource = function (page) {
    let pageResource = new PageResource(page);
    this.resources.push(pageResource);
    return pageResource;
};

Helper.prototype.saveResource_pageStyle = function (page) {
    let pageResource = this.getPageResource(page);

    if (pageResource == null) {
        return;
    }

    let url = this.pageStyleUrl(page);
    pageResource.saveStyle(url);
};

Helper.prototype.saveResource_pageScript = function (page) {
    let pageResource = this.getPageResource(page);

    if (pageResource == null) {
        return;
    }

    let url = this.pageScriptUrl(page);
    pageResource.saveScript(url);
};

/* Resource end */

module.exports = Helper;