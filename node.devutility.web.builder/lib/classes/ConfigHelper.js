/**
 * Application configuration file helper.
 */

const sysPath = require("path");
const ioUtilities = require("utilities-io");
const PageResource = require("./PageResource");
const projectDirectory = process.cwd();

function Helper(options) {
    this.options = options;
    this.resources = {};
    this.init();
}

Helper.prototype.init = function () {
    let pageDirs = ioUtilities.getDirectories(this.options.app.pages);

    for (let index in pageDirs) {
        let pageDir = pageDirs[index];
        let pageName = ioUtilities.getLastPath(pageDir);
        let pageResource = new PageResource(pageName);

        if (this.hasStyleLibs()) {
            let styleLibsUrl = this.styleLibUrl();
            pageResource.saveStyle(styleLibsUrl);
        }

        if (this.hasScriptLibs()) {
            let scriptLibsUrl = this.scriptLibUrl();
            pageResource.saveScript(scriptLibsUrl);
        }

        let styleFiles = ioUtilities.getAllFiles(pageDir, this.options.app.styleNameRegex);

        if (styleFiles && styleFiles.length > 0) {
            if (styleFiles.length > 1) {
                throw new Error("One page should only has one main sass file which match the regex " + this.options.app.styleNameRegex);
            }

            if (styleFiles.length == 1) {
                let url = this.pageStyleUrl(pageName);
                pageResource.saveStyle(url);
            }
        }

        let scriptFiles = ioUtilities.getAllFiles(pageDir, this.options.app.scriptNameRegex);

        if (scriptFiles && scriptFiles.length > 0) {
            if (scriptFiles.length > 1) {
                throw new Error("One page should only has one main typescript file which match the regex " + this.options.app.scriptNameRegex);
            }

            if (scriptFiles.length == 1) {
                let url = this.pageScriptUrl(pageName);
                pageResource.saveScript(url);
            }
        }

        this.resources[pageName] = pageResource;
    }
};

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

    let pageResource = this.resources[page];

    if (pageResource != null) {
        data.styles = pageResource.styles;
        data.scripts = pageResource.scripts;
    }

    return data;
};

/* Url end */

/* Webpack */

Helper.prototype.getEntry = function () {
    let result = {};
    let counter = 0;
    let pageDirs = ioUtilities.getDirectories(this.options.app.pages);

    for (let index in pageDirs) {
        let pageDir = pageDirs[index];
        let pageName = ioUtilities.getLastPath(pageDir);
        let scriptFiles = ioUtilities.getAllFiles(pageDir, this.options.app.scriptNameRegex);

        if (!scriptFiles || scriptFiles.length == 0) {
            continue;
        }

        counter++;
        result[pageName] = scriptFiles[0];
    }

    if (counter == 0) {
        return null;
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

/* Resource end */

module.exports = Helper;