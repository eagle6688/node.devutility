/**
 * Compile sass files and integrate them into one css file for each page.
 * 
 * @author: Aldwin Su
 * @Copyright: 2018. All rights reserved.
 */

import fs from "fs";
import ioUtilities from "utilities-io";
import styleUtilities from "utilities-style";

class Builder {
    static compile(configer, styleFile, pageName) {
        let style = styleUtilities.compile(styleFile).css;
        let styleFilePath = configer.getPageStylePath(pageName);
        fs.writeFileSync(styleFilePath, style);

        let styleFileName = configer.getPageStyleName(pageName);
        console.log(styleFileName, "compiled completed!");
    }

    static build(configer) {
        let styleDirectory = configer.getStyleDeployDirectory();
        ioUtilities.createDirectory(styleDirectory);
        let pagePaths = configer.getPagesDirectories();

        for (let index in pagePaths) {
            let pagePath = pagePaths[index];
            let pageName = ioUtilities.getLastPath(pagePath);
            let styleFiles = ioUtilities.getAllFiles(pagePath, configer.options.compile.pageStyleNameRegex);

            if (!styleFiles || styleFiles.length == 0) {
                continue;
            }

            this.compile(styleFiles[0], pageName);
        }

        console.log("All style files compiled completed!");
    }
}

export default Builder;