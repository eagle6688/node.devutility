/**
 * Resource provider.
 * 
 * @author: Aldwin Su
 * @Copyright: 2023. All rights reserved.
 */

import ioUtilities from "utilities-io";
import PageResource from "../model/PageResource.js";

class ResourceProvider {
    static getPageResources(handler, options) {
        let resources = {};
        let pageDirs = handler.getPagesDirectories();

        if (!pageDirs || pageDirs.length == 0) {
            return resources;
        }

        for (let index in pageDirs) {
            let pageDir = pageDirs[index];
            let pageName = ioUtilities.getLastPath(pageDir);
            let pageResource = new PageResource(pageName);

            if (handler.hasStyleLibs()) {
                let styleLibsUrl = handler.getStyleLibUrl();
                pageResource.saveStyle(styleLibsUrl);
            }

            if (handler.hasScriptLibs()) {
                let scriptLibsUrl = handler.getScriptLibUrl();
                pageResource.saveScriptLib(scriptLibsUrl);
            }

            let styleFiles = ioUtilities.getAllFiles(pageDir, options.compile.pageStyleNameRegex);

            if (styleFiles && styleFiles.length > 0) {
                if (styleFiles.length > 1) {
                    throw new Error("One page should only has one main sass file which match the regex " + options.compile.pageStyleNameRegex);
                }

                if (styleFiles.length == 1) {
                    let url = handler.getPageStyleUrl(pageName);
                    pageResource.saveStyle(url);
                }
            }

            let scriptFiles = ioUtilities.getAllFiles(pageDir, options.compile.pageScriptNameRegex);

            if (scriptFiles && scriptFiles.length > 0) {
                if (scriptFiles.length > 1) {
                    throw new Error("One page should only has one main typescript file which match the regex " + options.compile.pageScriptNameRegex);
                }

                if (scriptFiles.length == 1) {
                    let url = handler.getPageScriptUrl(pageName);
                    pageResource.saveScript(url);
                }
            }

            resources[pageName] = pageResource;
        }

        return resources;
    }
}

export default ResourceProvider;