/**
 * Compile typescript files and integrate into one javascript file for each page.
 * 
 * @author: Aldwin Su
 * @Copyright: 2018. All rights reserved.
 */

import webpack from "webpack";
import { Logger } from "utilities-common";
import ioUtilities from "utilities-io";
import TypeScriptValidator from "../validator/complie/TypeScriptValidator.js";

class Builder {
    static logger = Logger.create("node.devutility.web.builder/bin/builder/TypeScriptBuilder.js");

    static build(handler) {
        this.logger.info("Start building TypeScript...");

        TypeScriptValidator.verify(handler);
        this.#build(handler);

        this.logger.info("Build TypeScript completed.");
    }

    static #build(handler) {
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