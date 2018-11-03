/**
 * Application configuration file helper.
 * 
 * @author: Aldwin Su
 * @Copyright: 2018. All rights reserved.
 */

const sysPath = require("path");
const ioUtilities = require("utilities-io");
const projectDirectory = process.cwd();

function Configer(options) {
    this.options = options;
}

/* File name */

Configer.prototype.getStyleLibName = function () {
    if (!this.options.deploy.versionedType || this.options.deploy.versionedType != 'prefix' || !this.options.deploy.version) {
        return this.options.compile.styleLibName;
    }

    return this.getVersionedName(this.options.compile.styleLibName);
};

Configer.prototype.getPageStyleName = function (page) {
    let name = this.options.compile.pageStyleNameFormat.replace(/{page}/, page);

    if (!this.options.deploy.versionedType || this.options.deploy.versionedType != 'prefix' || !this.options.deploy.version) {
        return name;
    }

    return this.getVersionedName(name);
};

Configer.prototype.getScriptLibName = function () {
    if (!this.options.deploy.versionedType || this.options.deploy.versionedType != 'prefix' || !this.options.deploy.version) {
        return this.options.compile.scriptLibName;
    }

    return this.getVersionedName(this.options.compile.scriptLibName);
};

Configer.prototype.getPageScriptName = function (page) {
    let name = this.options.compile.pageScriptNameFormat.replace(/{page}/, page);

    if (!this.options.deploy.versionedType || this.options.deploy.versionedType != 'prefix' || !this.options.deploy.version) {
        return name;
    }

    return this.getVersionedName(name);
};

/* File name end */

/* Directory */

Configer.prototype.getViewsDirectory = function () {
    return sysPath.join(projectDirectory, this.options.views);
};

Configer.prototype.getPagesDirectories = function () {
    const dir = sysPath.join(this.options.views, this.options.hbs.pages);
    return ioUtilities.getDirectories(dir);
};

Configer.prototype.getPartialsDirectory = function () {
    return sysPath.join(projectDirectory, this.options.views, this.options.hbs.partials);
};

Configer.prototype.getStyleDeployDirectory = function () {
    return sysPath.join(projectDirectory, this.options.deploy.dir, this.options.deploy.stylesDir);
};

Configer.prototype.getScriptDeployDirectory = function () {
    return sysPath.join(projectDirectory, this.options.deploy.dir, this.options.deploy.scriptsDir);
};

/* Directory end */

/* Path */

/**
 * Get deploy root path, used for express register.
 */
Configer.prototype.getDeployPath = function () {
    let dir = this.options.deploy.dir;

    if (dir.indexOf('/') == 0) {
        return dir;
    }

    return '/' + dir;
};

/**
 * Get static relative paths, used for express register.
 */
Configer.prototype.getStaticPaths = function () {
    let paths = this.options.staticPaths;
    paths.push(this.getDeployPath());
    return paths;
};

Configer.prototype.getPageStylePath = function (page) {
    let fileName = this.getPageStyleName(page);
    let deployDir = this.getStyleDeployDirectory();
    return sysPath.join(deployDir, fileName);
};

Configer.prototype.getPageScriptPath = function (page) {
    let fileName = this.getPageScriptName(page);
    let deployDir = this.getScriptDeployDirectory();
    return sysPath.join(projectDirectory, deployDir, fileName);
};

Configer.prototype.getFaviconPath = function () {
    return sysPath.join(projectDirectory, this.options.deploy.dir, this.options.deploy.favicon);
};

/* Path end */

/* Url */

Configer.prototype.getBaseUrl = function () {
    if (this.options.deploy.host.endsWith('/')) {
        return this.options.deploy.host;
    }

    return this.options.deploy.host + '/';
};

Configer.prototype.getStyleLibUrl = function () {
    let url = this.getBaseUrl() + this.options.deploy.stylesDir + "/" + this.getStyleLibName();

    if (this.options.deploy.versionedType == 'prefix') {
        return url;
    }

    return this.getVersionedUrl(url);
};

Configer.prototype.getPageStyleUrl = function (page) {
    let url = this.getBaseUrl() + this.options.deploy.stylesDir + "/" + this.getPageStyleName(page);

    if (this.options.deploy.versionedType == 'prefix') {
        return url;
    }

    return this.getVersionedUrl(url);
};

Configer.prototype.getScriptLibUrl = function () {
    let url = this.getBaseUrl() + this.options.deploy.scriptsDir + "/" + this.getScriptLibName();

    if (this.options.deploy.versionedType == 'prefix') {
        return url;
    }

    return this.getVersionedUrl(url);
};

Configer.prototype.getPageScriptUrl = function (page) {
    let url = this.getBaseUrl() + this.options.deploy.scriptsDir + "/" + this.getPageScriptName(page);

    if (this.options.deploy.versionedType == 'prefix') {
        return url;
    }

    return this.getVersionedUrl(url);
};

/* Url end */

/* Webpack */

Configer.prototype.getEntry = function () {
    let result = {};
    let counter = 0;
    let pageDirs = this.getPagesDirectories();

    for (let index in pageDirs) {
        let pageDir = pageDirs[index];
        let pageName = ioUtilities.getLastPath(pageDir);
        let scriptFiles = ioUtilities.getAllFiles(pageDir, this.options.compile.pageScriptNameRegex);

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

Configer.prototype.getOutput = function () {
    let result = {};
    result.filename = this.getPageScriptName('[name]');
    result.path = this.getScriptDeployDirectory();
    return result;
};

/* Webpack end */

/* Resource */

Configer.prototype.hasStyleLibs = function () {
    let styles = this.options.resources.styles;
    return styles && styles.length > 0;
};

Configer.prototype.hasScriptLibs = function () {
    let scripts = this.options.resources.scripts;
    return scripts && scripts.length > 0;
};

/* Resource end */

/* Other */

Configer.prototype.getVersionedName = function (name) {
    return this.options.deploy.version + "_" + name;
};

Configer.prototype.getVersionedUrl = function (url) {
    if (!this.options.deploy.version) {
        return url;
    }

    return url + "?v=" + this.options.deploy.version;
};

/* Other end */

module.exports = Configer;