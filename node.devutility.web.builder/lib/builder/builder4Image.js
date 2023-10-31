/**
 * Move images files to target directory.
 * 
 * @author: Aldwin Su
 * @Copyright: 2018. All rights reserved.
 */

import sysPath from "path";
import ioUtilities from "utilities-io";

class Builder {
    static build(options) {
        let projectDirectory = process.cwd();
        let sourceDir = sysPath.join(projectDirectory, options.resources.imagesDir);
        let targetDir = sysPath.join(projectDirectory, options.deploy.dir, options.deploy.imagesDir);
        ioUtilities.copyFiles(sourceDir, targetDir);
    }
}

export default Builder;