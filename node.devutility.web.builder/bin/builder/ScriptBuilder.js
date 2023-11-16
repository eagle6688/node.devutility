/**
 * Combine all of script files to one script file.
 * 
 * @author: Aldwin Su
 * @Copyright: 2018. All rights reserved.
 */

import fs from "fs";
import sysPath from "path";
import { Logger } from "utilities-common";
import ioUtilities from "utilities-io";
import scriptUtilities from "utilities-script";

class Builder {
    static logger = Logger.create("node.devutility.web.builder/bin/builder/ScriptBuilder.js");

    static build(handler) {
        let options = handler.options;

        if (!options.resources.scripts) {
            return;
        }

        let array = [];
        let scriptFiles = options.resources.scripts;
        let projectDirectory = process.cwd();
        let scriptLibDir = sysPath.join(projectDirectory, options.deploy.dir, options.deploy.scriptsDir);
        let scriptLibName = handler.getScriptLibName();
        let scriptLibPath = sysPath.join(scriptLibDir, scriptLibName);
        ioUtilities.createDirectory(scriptLibDir);

        for (let index in scriptFiles) {
            let content = scriptUtilities.compressJs(scriptFiles[index]);
            array.push(content);
        }

        fs.writeFileSync(scriptLibPath, array.join('\n'));
        Builder.displayMessage(scriptFiles, scriptLibPath);
    }

    static displayMessage(files, target) {
        Builder.logger.info("Script files:");

        for (let index in files) {
            Builder.logger.info(files[index], ",");
        }

        Builder.logger.info("have been bundled into", target, "completely!");
    }
}

export default Builder;