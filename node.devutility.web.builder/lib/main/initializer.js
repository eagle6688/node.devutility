/**
 * Initialize process.
 * 
 * @author: Aldwin Su
 * @Copyright: 2018. All rights reserved.
 */

const ioUtilities = require("utilities-io");
const PageResource = require("../com/page-resource");

module.exports = function (configer) {
    let resources = {};
    let options = configer.options;
    let pageDirs = configer.getPagesDirectories();

    for (let index in pageDirs) {
        let pageDir = pageDirs[index];
        let pageName = ioUtilities.getLastPath(pageDir);
        let pageResource = new PageResource(pageName);

        if (configer.hasStyleLibs()) {
            let styleLibsUrl = configer.getStyleLibUrl();
            pageResource.saveStyle(styleLibsUrl);
        }

        if (configer.hasScriptLibs()) {
            let scriptLibsUrl = configer.getScriptLibUrl();
            pageResource.saveScript(scriptLibsUrl);
        }

        let styleFiles = ioUtilities.getAllFiles(pageDir, options.compile.pageStyleNameRegex);

        if (styleFiles && styleFiles.length > 0) {
            if (styleFiles.length > 1) {
                throw new Error("One page should only has one main sass file which match the regex " + options.compile.pageStyleNameRegex);
            }

            if (styleFiles.length == 1) {
                let url = configer.getPageStyleUrl(pageName);
                pageResource.saveStyle(url);
            }
        }

        let scriptFiles = ioUtilities.getAllFiles(pageDir, options.compile.pageScriptNameRegex);

        if (scriptFiles && scriptFiles.length > 0) {
            if (scriptFiles.length > 1) {
                throw new Error("One page should only has one main typescript file which match the regex " + options.compile.pageScriptNameRegex);
            }

            if (scriptFiles.length == 1) {
                let url = configer.getPageScriptUrl(pageName);
                pageResource.saveScript(url);
            }
        }

        resources[pageName] = pageResource;
    }

    return resources;
};