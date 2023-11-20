/**
 * Move font files to target directory.
 * 
 * @author: Aldwin Su
 * @Copyright: 2018. All rights reserved.
 */

import sysPath from "path";
import { Logger } from "utilities-common";
import ioUtilities from "utilities-io";
import FontsValidator from "../validator/complie/FontsValidator.js";

class Builder {
    static logger = Logger.create("node.devutility.web.builder/bin/builder/FontsBuilder.js");

    static build(handler) {
        this.logger.info("Start building fonts...");

        FontsValidator.verify(handler);
        this.#build(handler);

        this.logger.info("Build fonts completed.");
    }

    static #build(handler) {
        let options = handler.getOptions();
        let projectDirectory = handler.getProjectDirectory();
        let sourceDir = sysPath.join(projectDirectory, options.resources.fontsDir);
        let targetDir = sysPath.join(projectDirectory, options.deploy.dir, options.deploy.fontsDir);
        ioUtilities.copyFiles(sourceDir, targetDir);
    }
}

export default Builder;