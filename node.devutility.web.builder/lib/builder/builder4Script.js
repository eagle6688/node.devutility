/**
 * Combine all of script files to one script file.
 * 
 * @author: Aldwin Su
 * @Copyright: 2018. All rights reserved.
 */

import fs from "fs";
import sysPath from "path";
import ioUtilities from "utilities-io";
import scriptUtilities from "utilities-script";

class Builder {
    static build(configer) {
        let options = configer.options;

        if (!options.resources.scripts) {
            return;
        }

        let array = [];
        let scriptFiles = options.resources.scripts;
        let projectDirectory = process.cwd();
        let scriptLibDir = sysPath.join(projectDirectory, options.deploy.dir, options.deploy.scriptsDir);
        let scriptLibName = configer.getScriptLibName();
        let scriptLibPath = sysPath.join(scriptLibDir, scriptLibName);
        ioUtilities.createDirectory(scriptLibDir);

        for (let index in scriptFiles) {
            let content = scriptUtilities.compressJs(scriptFiles[index]);
            array.push(content);
        }

        fs.writeFileSync(scriptLibPath, array.join('\n'));
        displayMessage(scriptFiles, scriptLibPath);
    }

    static displayMessage(files, target) {
        console.log("Script files:");

        for (let index in files) {
            console.log(files[index], ",");
        }

        console.log("have been bundled into", target, "completely!");
    }
}

export default Builder;