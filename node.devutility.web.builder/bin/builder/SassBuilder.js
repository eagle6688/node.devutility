/**
 * Compile sass files and integrate them into one css file for each page.
 * 
 * @author: Aldwin Su
 * @Copyright: 2018. All rights reserved.
 */

import fs from "fs";
import { Logger } from "utilities-common";
import ioUtilities from "utilities-io";
import styleUtilities from "utilities-style";

class Builder {
    static logger = Logger.create("node.devutility.web.builder/bin/builder/SassBuilder.js");

    static compile(styleFile, pageName, handler) {
        let style = styleUtilities.compile(styleFile).css;
        let styleFilePath = handler.getPageStylePath(pageName);
        fs.writeFileSync(styleFilePath, style);

        let styleFileName = handler.getPageStyleName(pageName);
        Builder.logger.info(styleFileName, "compiled completed!");
    }

    static build(handler) {
        let styleDirectory = handler.getStyleDeployDirectory();
        ioUtilities.createDirectory(styleDirectory);
        let pagePaths = handler.getPagesDirectories();

        for (let index in pagePaths) {
            let pagePath = pagePaths[index];
            let pageName = ioUtilities.getLastPath(pagePath);
            let styleFiles = ioUtilities.getAllFiles(pagePath, handler.options.compile.pageStyleNameRegex);

            if (!styleFiles || styleFiles.length == 0) {
                continue;
            }

            Builder.compile(styleFiles[0], pageName, handler);
        }

        Builder.logger.info("All style files compiled completed!");
    }
}

export default Builder;