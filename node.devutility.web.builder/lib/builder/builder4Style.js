/**
 * Compress all base styles and integrate them into one css file.
 * 
 * @author: Aldwin Su
 * @Copyright: 2018. All rights reserved.
 */

import exp from "constants";
import fs from "fs";
import sysPath from "path";
import ioUtilities from "utilities-io";
import styleUtilities from "utilities-style";

class Builder {
    static build(handler) {
        let styleDirectory = handler.getStyleDeployDirectory();
        ioUtilities.createDirectory(styleDirectory);

        let styles = [];
        let styleFiles = handler.options.resources.styles;

        try {
            styles = Builder.getStyles(styleFiles);
        }
        catch (err) {
            console.log("Bundle style files failed:", err);
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
        console.log("Style files:");

        for (let index in files) {
            console.log(files[index], ",");
        }

        console.log("have been bundled into", target, "completely!");
    }
}

export default Builder;