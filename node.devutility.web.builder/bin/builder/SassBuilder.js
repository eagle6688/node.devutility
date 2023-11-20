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
import SassValidator from "../validator/complie/SassValidator.js";

class Builder {
    static logger = Logger.create("node.devutility.web.builder/bin/builder/SassBuilder.js");

    static build(handler) {
        this.logger.info("Start building images...");

        SassValidator.verify(handler);
        this.#build(handler);

        this.logger.info("Build images completed.");
    }

    static #build(handler) {
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

            this.#compile(styleFiles[0], pageName, handler);
        }

        this.logger.info("All style files compiled completed!");
    }

    static #compile(styleFile, pageName, handler) {
        let style = styleUtilities.compile(styleFile).css;
        let styleFilePath = handler.getPageStylePath(pageName);
        fs.writeFileSync(styleFilePath, style);

        let styleFileName = handler.getPageStyleName(pageName);
        this.logger.info(styleFileName, "compiled completed!");
    }
}

export default Builder;