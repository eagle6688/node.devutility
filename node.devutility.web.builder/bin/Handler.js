/**
 * Application configuration file helper.
 * 
 * @author: Aldwin Su
 * @Copyright: 2018. All rights reserved.
 */

import sysPath from "path";
import ioUtilities from "utilities-io";

function Handler(options) {
    this.options = options;
    this.projectDirectory = process.cwd();
}

Handler.prototype.getOptions = function () {
    return this.options;
};

Handler.prototype.getProjectDirectory = function () {
    return this.projectDirectory;
};

/* File name */

Handler.prototype.getStyleLibName = function () {
    if (!this.options.deploy.versionedType || this.options.deploy.versionedType != 'prefix' || !this.options.deploy.version) {
        return this.options.compile.styleLibName;
    }

    return this.getVersionedName(this.options.compile.styleLibName);
};

Handler.prototype.getPageStyleName = function (page) {
    let name = this.options.compile.pageStyleNameFormat.replace(/{page}/, page);

    if (!this.options.deploy.versionedType || this.options.deploy.versionedType != 'prefix' || !this.options.deploy.version) {
        return name;
    }

    return this.getVersionedName(name);
};

Handler.prototype.getScriptLibName = function () {
    if (!this.options.deploy.versionedType || this.options.deploy.versionedType != 'prefix' || !this.options.deploy.version) {
        return this.options.compile.scriptLibName;
    }

    return this.getVersionedName(this.options.compile.scriptLibName);
};

Handler.prototype.getPageScriptName = function (page) {
    let name = this.options.compile.pageScriptNameFormat.replace(/{page}/, page);

    if (!this.options.deploy.versionedType || this.options.deploy.versionedType != 'prefix' || !this.options.deploy.version) {
        return name;
    }

    return this.getVersionedName(name);
};

/* File name end */

/* Directory */

Handler.prototype.getViewsDirectory = function () {
    return sysPath.join(this.projectDirectory, this.options.views);
};

Handler.prototype.getPagesDirectories = function () {
    let directories = [];
    let rootDirectories = this.options.hbs.pages;

    if (!rootDirectories || rootDirectories.length == 0) {
        rootDirectories = [sysPath.join(this.options.views, "pages")];
    }

    for (let index in rootDirectories) {
        ioUtilities.getDirectories(rootDirectories[index]).forEach(i => {
            directories.push(i);
        });
    }

    return directories;
};

Handler.prototype.getPartialsDirectories = function () {
    if (!this.options.hbs.partials || this.options.hbs.partials.length == 0) {
        return [sysPath.join(this.options.views, "partials")];
    }

    return this.options.hbs.partials;
};

Handler.prototype.getStyleDeployDirectory = function () {
    return sysPath.join(this.projectDirectory, this.options.deploy.dir, this.options.deploy.stylesDir);
};

Handler.prototype.getScriptDeployDirectory = function () {
    return sysPath.join(this.projectDirectory, this.options.deploy.dir, this.options.deploy.scriptsDir);
};

/* Directory end */

/* Path */

/**
 * Get deploy root path, used for express register.
 */
Handler.prototype.getDeployPath = function () {
    let dir = this.options.deploy.dir;

    if (dir.indexOf('/') == 0) {
        return dir;
    }

    return '/' + dir;
};

/**
 * Get static relative paths, used for express register.
 */
Handler.prototype.getStaticPaths = function () {
    let paths = this.options.staticPaths;
    paths.push(this.getDeployPath());
    return paths;
};

Handler.prototype.getPageStylePath = function (page) {
    let fileName = this.getPageStyleName(page);
    let deployDir = this.getStyleDeployDirectory();
    return sysPath.join(deployDir, fileName);
};

Handler.prototype.getPageScriptPath = function (page) {
    let fileName = this.getPageScriptName(page);
    let deployDir = this.getScriptDeployDirectory();
    return sysPath.join(this.projectDirectory, deployDir, fileName);
};

Handler.prototype.getFaviconPath = function () {
    return sysPath.join(this.projectDirectory, this.options.deploy.dir, this.options.deploy.favicon);
};

/* Path end */

/* Url */

Handler.prototype.getBaseUrl = function () {
    if (this.options.deploy.host.endsWith('/')) {
        return this.options.deploy.host;
    }

    return this.options.deploy.host + '/';
};

Handler.prototype.getStyleLibUrl = function () {
    let url = this.getBaseUrl() + this.options.deploy.stylesDir + "/" + this.getStyleLibName();

    if (this.options.deploy.versionedType == 'prefix') {
        return url;
    }

    return this.getVersionedUrl(url);
};

Handler.prototype.getPageStyleUrl = function (page) {
    let url = this.getBaseUrl() + this.options.deploy.stylesDir + "/" + this.getPageStyleName(page);

    if (this.options.deploy.versionedType == 'prefix') {
        return url;
    }

    return this.getVersionedUrl(url);
};

Handler.prototype.getScriptLibUrl = function () {
    let url = this.getBaseUrl() + this.options.deploy.scriptsDir + "/" + this.getScriptLibName();

    if (this.options.deploy.versionedType == 'prefix') {
        return url;
    }

    return this.getVersionedUrl(url);
};

Handler.prototype.getPageScriptUrl = function (page) {
    let url = this.getBaseUrl() + this.options.deploy.scriptsDir + "/" + this.getPageScriptName(page);

    if (this.options.deploy.versionedType == 'prefix') {
        return url;
    }

    return this.getVersionedUrl(url);
};

/* Url end */

/* Webpack */

Handler.prototype.getEntry = function () {
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

Handler.prototype.getOutput = function () {
    let result = {};
    result.filename = this.getPageScriptName('[name]');
    result.path = this.getScriptDeployDirectory();
    return result;
};

/* Webpack end */

/* Resource */

Handler.prototype.hasStyleLibs = function () {
    let styles = this.options.resources.styles;
    return styles && styles.length > 0;
};

Handler.prototype.hasScriptLibs = function () {
    let scripts = this.options.resources.scripts;
    return scripts && scripts.length > 0;
};

/* Resource end */

/* Other */

Handler.prototype.getVersionedName = function (name) {
    return this.options.deploy.version + "_" + name;
};

Handler.prototype.getVersionedUrl = function (url) {
    if (!this.options.deploy.version) {
        return url;
    }

    return url + "?v=" + this.options.deploy.version;
};

/* Other end */

export default Handler;