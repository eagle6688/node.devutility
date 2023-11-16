/**
 * Compress all base styles and integrate them into one css file.
 * 
 * @author: Aldwin Su
 * @Copyright: 2018. All rights reserved.
 */

import fs from "fs";
import sysPath from "path";
import { Logger } from "utilities-common";
import ioUtilities from "utilities-io";
import styleUtilities from "utilities-style";

class Builder {
    static logger = Logger.create("node.devutility.web.builder/bin/builder/StyleBuilder.js");

    static build(handler) {
        let styleDirectory = handler.getStyleDeployDirectory();
        ioUtilities.createDirectory(styleDirectory);

        let styles = [];
        let styleFiles = handler.options.resources.styles;

        try {
            styles = Builder.getStyles(styleFiles);
        }
        catch (err) {
            Builder.logger.info("Bundle style files failed:", err);
            return;
        }

        let content = styles.join('\n');
        let styleLibName = handler.getStyleLibName();
        let styleLibPath = sysPath.join(styleDirectory, styleLibName);
        fs.writeFileSync(styleLibPath, content);
        Builder.displayMessage(styleFiles, styleLibPath);
    }

    static getStyles(files) {
        let array = [];

        for (let index in files) {
            let styleFile = files[index];
            let content = styleUtilities.compress(styleFile);
            array.push(content);
        }

        return array;
    }

    static displayMessage(files, target) {
        Builder.logger.info("Style files:");

        for (let index in files) {
            Builder.logger.info(files[index], ",");
        }

        Builder.logger.info("have been bundled into", target, "completely!");
    }
}

export default Builder;