/**
 * Compile typescript files and integrate into one javascript file for each page.
 * 
 * @author: Aldwin Su
 * @Copyright: 2018. All rights reserved.
 */

import webpack from "webpack";
import ioUtilities from "utilities-io";

class Builder {
    static build(configer) {
        let options = configer.options;
        let entry = configer.getEntry();

        if (!entry) {
            return;
        }

        options.webpack.entry = entry;
        options.webpack.output = configer.getOutput();

        let scriptDirectory = configer.getScriptDeployDirectory();
        ioUtilities.createDirectory(scriptDirectory);

        webpack(options.webpack, (err, stats) => {
            if (err || stats.hasErrors()) {
                console.log(err);
            }
        });
    }
}

export default Builder;