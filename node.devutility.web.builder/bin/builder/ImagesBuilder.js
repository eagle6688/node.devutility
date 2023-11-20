/**
 * Move images files to target directory.
 * 
 * @author: Aldwin Su
 * @Copyright: 2018. All rights reserved.
 */

import sysPath from "path";
import { Logger } from "utilities-common";
import ioUtilities from "utilities-io";
import ImagesValidator from "../validator/complie/ImagesValidator.js";

class Builder {
    static logger = Logger.create("node.devutility.web.builder/bin/builder/ImagesBuilder.js");

    static build(handler) {
        this.logger.info("Start building images...");

        ImagesValidator.verify(handler);
        this.#build(handler);

        this.logger.info("Build images completed.");
    }

    static #build(handler) {
        let options = handler.getOptions();
        let projectDirectory = handler.getProjectDirectory();
        let sourceDir = sysPath.join(projectDirectory, options.resources.imagesDir);
        let targetDir = sysPath.join(projectDirectory, options.deploy.dir, options.deploy.imagesDir);
        ioUtilities.copyFiles(sourceDir, targetDir);
    }
}

export default Builder;