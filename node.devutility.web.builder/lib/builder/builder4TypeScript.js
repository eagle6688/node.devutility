/**
 * Compile typescript files and integrate into one javascript file for each page.
 * 
 * @author: Aldwin Su
 * @Copyright: 2018. All rights reserved.
 */

import webpack from "webpack";
import ioUtilities from "utilities-io";

class Builder {
    static build(handler) {
        let options = handler.options;
        let entry = handler.getEntry();

        if (!entry) {
            return;
        }

        options.webpack.entry = entry;
        options.webpack.output = handler.getOutput();

        let scriptDirectory = handler.getScriptDeployDirectory();
        ioUtilities.createDirectory(scriptDirectory);

        webpack(options.webpack, (err, stats) => {
            if (err || stats.hasErrors()) {
                console.log(err);
            }
        });
    }
}

export default Builder;